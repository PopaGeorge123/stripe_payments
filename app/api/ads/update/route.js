import { NextResponse } from "next/server";
import connectMongoDB from '@/utils/database';
import Config from "@/models/Config";

export async function POST(request, response) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const updateItem = body.update
    console.log(updateItem)

    const updatedData = await Config.updateOne(
      { testId: "test13579" }, // Filter criteria
      { $inc: { [updateItem]: 1 } } // Use $inc to increment the specified field
    );
    //console.log(updatedData)

    if (updatedData.ok === 1) {
      return NextResponse.json({ message: "Field updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to update field" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating field:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
