import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const userId = await getDataFromToken(request);

        // .lean() returns a plain JS object — skips Mongoose Document overhead (2-3× faster)
        // Select only the fields actually used by the UI — never fetch the lectures array here
        const user = await User.findById(userId)
            .select("name email role phoneNumber gender dateOfBirth isVerified createdAt")
            .lean();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        return NextResponse.json(
            { message: "User found", data: user },
            {
                headers: {
                    // Cache for 30 s in browser, serve stale up to 60 s while revalidating
                    "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
                },
            }
        );
    } catch {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
}
