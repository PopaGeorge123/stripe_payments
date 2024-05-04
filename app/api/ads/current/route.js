import { NextResponse } from "next/server";
import connectMongoDB from '@/utils/database';
import Config from "@/models/Config";
import Post from "@/models/Post";

export async function GET(request, response) {
  await connectMongoDB();

  const conf = await Config.findOne({ testId: "test13579" });
  const updatedData = await Config.updateOne(
    { testId: "test13579" }, // Filter criteria
    { $inc: { ["currentAdViews"]: 1 } } // Use $inc to increment the specified field
  );

  if (!conf) {
    return NextResponse.json({ error: "No config data found" }, { status: 404 });
  }

  const ad = await Post.findOne({ sesionId: conf.currentAdId });
  if (!ad) {
    return NextResponse.json({ error: "No ad data found" }, { status: 404 });
  }
  
  const mergedData = { data: [conf, ad] };
  return NextResponse.json(mergedData, { status: 200 });
}