export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectMongoDB from '@/utils/database';
import Config from "@/models/Config";
import Post from "@/models/Post";

export async function GET(request, response) {
  try {
    await connectMongoDB();

    const conf = await Config.findOne({ testId: "test13579" });
    
    const updatedData = await Config.updateOne(
      { testId: "test13579" }, // Filter criteria
      { $inc: { ["currentAdViews"]: 1 } } // Use $inc to increment the specified field
    );    

    const allPosts = await Post.find({ paid: true });
    const ad = await Post.findOne({ sesionId: conf.currentAdId });
    
    console.log("CONFIG: ", conf);

    if (!conf) {
      return NextResponse.json({ error: "No config data found" }, { status: 404 });
    }
    if (!ad) {
      return NextResponse.json({ error: "No ad data found" }, { status: 404 });
    }

    //console.log("ALL POSTS: ", allPosts);
    const reversedPosts = allPosts.reverse();

    const mergedData = { data: [conf, ad, reversedPosts] };
    return NextResponse.json(mergedData, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
