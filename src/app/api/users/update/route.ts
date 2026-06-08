import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const reqBody = await request.json();
        const { name, gender, dateOfBirth } = reqBody;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, gender, dateOfBirth },
            { new: true }
        ).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User details updated successfully",
            success: true,
            updatedUser: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
