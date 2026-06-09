import { connect } from "@/dbConfig/dbConfig"; // Database connection
import User from "@/models/userModel"; // User model
import { NextRequest, NextResponse } from "next/server"; // Next.js API response types
import { getDataFromToken } from "@/helpers/getDataFromToken"; // Helper to extract user data from token

// Establish database connection
// connect() is called inside the handler

// GET /api/users/lecture?id=<lectureId> — fetch single lecture content
export async function GET(request: NextRequest) {
    try {
        await connect();
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const lectureId = request.nextUrl.searchParams.get("id");
        if (!lectureId) {
            return NextResponse.json({ error: "Lecture ID required" }, { status: 400 });
        }

        // Positional $ projection — only returns the matched subdocument, not full user
        const user = await User.findOne(
            { _id: userId, "lectures._id": lectureId },
            { "lectures.$": 1 }
        ).lean() as any;

        if (!user?.lectures?.[0]) {
            return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
        }

        return NextResponse.json({ lecture: user.lectures[0], success: true });
    } catch {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
}

// Define POST request handler to add a lecture
export async function POST(request: NextRequest) {
    try {
        await connect();
        // Extract userId (or email) from the token
        const userId = await getDataFromToken(request); // Get userId from the token
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Extract the topic from the request body
        const { topic } = await request.json();

        // Ensure topic is provided
        if (!topic) {
            return NextResponse.json({ error: "Lecture topic is required" }, { status: 400 });
        }

        // Find the user by userId (use _id to ensure you're querying correctly in MongoDB)
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }


        // Ensure the `lectures` field is initialized as an array
        if (!Array.isArray(user.lectures)) {
            user.lectures = []; // Initialize as an empty array if not already an array
        }

      

        // Add the new lecture topic to the user's lectures array
        user.lectures.push({ topic });

        

        // Save the updated user data in the database
        const updatedUser = await user.save();

       

        return NextResponse.json({
            message: "Lecture added successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
