import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signupLimiter } from "@/helpers/ratelimit";
import { verifyTurnstile } from "@/helpers/verifyTurnstile";

export async function POST(request: NextRequest) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

    // ── Rate limiting (gracefully skipped if Redis not configured) ───────────
    try {
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
    } catch (err) {
        console.error("[Signup] Rate limiter threw:", err);
        // Continue — don't block users because of a Redis outage
    }

    try {
        const reqBody = await request.json();
        const { name, email, phoneNumber, password, captchaToken } = reqBody;

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
        if (
            !name || !email || !password ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const sanitizedEmail = email.toLowerCase().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        if (name.length > 100) {
            return NextResponse.json({ error: "Name too long" }, { status: 400 });
        }

        // ── Database ─────────────────────────────────────────────────────────
        await connect(); // throws with a clear message if MONGO_URI is missing

        const existingEmail = await User.findOne({ email: sanitizedEmail });
        if (existingEmail) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        if (phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone) {
                return NextResponse.json(
                    { error: "Phone number already in use" },
                    { status: 400 }
                );
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email: sanitizedEmail,
            phoneNumber: phoneNumber || null,
            password: hashedPassword,
            lectures: [],
        });

        await newUser.save();

        return NextResponse.json({
            message: "Account created successfully",
            success: true,
        });
    } catch (error: any) {
        // Surface the real error message so issues are diagnosable
        const msg = error?.message ?? "Signup failed";
        console.error("[Signup] Error:", msg);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
