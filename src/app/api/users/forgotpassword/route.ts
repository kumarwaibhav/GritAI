import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { forgotLimiter } from "@/helpers/ratelimit";

// connect() is called inside the handler

export async function POST(request: NextRequest) {
    try {
        await connect();
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
        const { success } = await forgotLimiter.limit(ip);
        if (!success) {
            return NextResponse.json(
                { error: "Too many requests. Try again in an hour." },
                { status: 429 }
            );
        }

        const { email } = await request.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        // Always return success to prevent email enumeration
        if (user) {
            await sendEmail({ email, emailType: "RESET", userId: user._id });
        }

        return NextResponse.json({
            message: "If an account exists with that email, a reset link has been sent.",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Request failed" }, { status: 500 });
    }
}
