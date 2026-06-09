import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginLimiter } from "@/helpers/ratelimit";
import { verifyTurnstile } from "@/helpers/verifyTurnstile";

export async function POST(request: NextRequest) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

    // ── Rate limiting ────────────────────────────────────────────────────────
    try {
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
    } catch (err) {
        console.error("[Login] Rate limiter threw:", err);
    }

    try {
        const reqBody = await request.json();
        const { email, password, captchaToken } = reqBody;

        // ── CAPTCHA ──────────────────────────────────────────────────────────
        if (!captchaToken) {
            return NextResponse.json({ error: "CAPTCHA required" }, { status: 400 });
        }
        const captchaValid = await verifyTurnstile(captchaToken, ip);
        if (!captchaValid) {
            return NextResponse.json(
                { error: "CAPTCHA verification failed. Please refresh and try again." },
                { status: 400 }
            );
        }

        // ── Field validation ─────────────────────────────────────────────────
        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        const sanitizedEmail = email.toLowerCase().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // ── Database ─────────────────────────────────────────────────────────
        await connect();

        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (!process.env.TOKEN_SECRET) {
            console.error("[Login] TOKEN_SECRET is not set");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ message: "Login successful", success: true });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
        });
        return response;
    } catch (error: any) {
        const msg = error?.message ?? "Login failed";
        console.error("[Login] Error:", msg);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
