import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginLimiter } from "@/helpers/ratelimit";
import { verifyTurnstile } from "@/helpers/verifyTurnstile";

connect();

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
        const { success, limit, remaining } = await loginLimiter.limit(ip);

        if (!success) {
            return NextResponse.json(
                { error: "Too many login attempts. Try again in 15 minutes." },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": String(limit),
                        "X-RateLimit-Remaining": String(remaining),
                    },
                }
            );
        }

        const reqBody = await request.json();
        const { email, password, captchaToken } = reqBody;

        if (!captchaToken) {
            return NextResponse.json({ error: "CAPTCHA required" }, { status: 400 });
        }

        const captchaValid = await verifyTurnstile(captchaToken, ip);
        if (!captchaValid) {
            return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 });
        }

        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        const sanitizedEmail = email.toLowerCase().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "Login successful", success: true });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
