import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Only fetch _id, topic, createdAt from each lecture — not notes/quiz/cheatsheet content
        const user = await User.findById(userId)
            .select("lectures._id lectures.topic lectures.createdAt")
            .lean() as any as any;

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 404 });
        }

        return NextResponse.json(
            { lectures: user.lectures ?? [], success: true },
            { headers: { "Cache-Control": "private, max-age=10, stale-while-revalidate=30" } }
        );
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
