import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const reqBody = await request.json();
        const { currentPassword, newPassword } = reqBody;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Current and new password required" }, { status: 400 });
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const validPassword = await bcryptjs.compare(currentPassword, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        user.password = await bcryptjs.hash(newPassword, 10);
        await user.save();

        return NextResponse.json({ message: "Password updated successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
