import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import Post from '@/models/Post';
import Config from '@/models/Config';
import connectMongoDB from '@/utils/database';
import { saveFile , cleanFolder } from "@/local/local";
import { sendNewsletterMail } from "@/libs/emails";

export async function POST(request) {
  await connectMongoDB();

  const body = await request.json();
  //console.log(body);

  if(body.type === 'checkout.session.completed') {
    const sesionId = body.data.object.id;
    const resp = await Post.findOne({sesionId: sesionId});
    const initilConf = await Config.findOne({ testId: "test13579" });

    if(resp.sesionId === sesionId) {//this means the purchase was successfull
      console.log("FILE : ", initilConf.currentImageName)
      //console.log("SESS : ",resp.sesionId)

      const setPaid = await Post.updateOne(
        {sesionId: sesionId},
        { 
          $set: { 
            paid: true,
          }
        }
      );

      const cnfg = await Config.updateOne(
        { testId: "test13579" },
        { 
          $set: { 
            currentImageName: resp.imageName,
            currentAdId: resp.sesionId,
            currentAdAccesses: 0,
            currentAdViews: 0,
          },
          $inc: { currentAdCount: 1 }
        }
      );
      //await cleanFolder(resp.imageName)
      
      console.log("Config updated",cnfg);
      console.log("Payment was successful");

      //find all user that has paid = true

      const allUsers = await Post.find({paid: true});
      
      await Promise.all(allUsers.map(async (user) => {
        await sendNewsletterMail(user.email, user.title, user.url);
        console.log("Email sent to ", user.email);
      }));
      
    }
  }

  return new NextResponse(null, { status: 200 });
}