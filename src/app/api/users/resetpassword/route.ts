import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// connect() is called inside the handler

// GET /api/users/resetpassword?token=xxx — validate token
export async function GET(request: NextRequest) {
    try {
        await connect();
        const token = request.nextUrl.searchParams.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
        }

        return NextResponse.json({ valid: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}

// POST /api/users/resetpassword — { token, newPassword }
export async function POST(request: NextRequest) {
    try {
        const { token, newPassword } = await request.json();

        if (!token || !newPassword) {
            return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
        }

        user.password = await bcryptjs.hash(newPassword, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Reset failed" }, { status: 500 });
    }
}
