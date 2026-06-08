import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signupLimiter } from "@/helpers/ratelimit";
import { verifyTurnstile } from "@/helpers/verifyTurnstile";

connect();

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
        const { success, limit, remaining } = await signupLimiter.limit(ip);

        if (!success) {
            return NextResponse.json(
                { error: "Too many signup attempts. Try again in an hour." },
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
        const { name, email, phoneNumber, password, captchaToken } = reqBody;

        if (!captchaToken) {
            return NextResponse.json({ error: "CAPTCHA required" }, { status: 400 });
        }

        const captchaValid = await verifyTurnstile(captchaToken, ip);
        if (!captchaValid) {
            return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 });
        }

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        if (phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone) {
                return NextResponse.json({ error: "Phone number already in use" }, { status: 400 });
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            lectures: [],
        });

        await newUser.save();

        return NextResponse.json({ message: "Account created successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}
