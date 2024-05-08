import { NextResponse } from "next/server";
import { sendNewsletterMail } from "@/libs/emails";
import connectMongoDB from '@/utils/database';
import Post from '@/models/Post';
import Config from '@/models/Config';

export async function GET(request) {
  await connectMongoDB();

  const Conf = await Config.findOne({ testId: "test13579" });
  const lastBuyer = await Post.findOne({ sesionId: Conf.currentAdId });
  const allUsers = await Post.find({paid: true});
      
      await Promise.all(allUsers.map(async (user) => {
        await sendNewsletterMail(user.email, user.title, lastBuyer.url);
        console.log("Email sent to ", user.email);
      }));

  return new NextResponse({message:"Success"}, { status: 200 });
}