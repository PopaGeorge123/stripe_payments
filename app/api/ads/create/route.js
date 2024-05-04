import multer from 'multer';
import connectMongoDB from '@/utils/database';
import  Post  from '@/models/Post'; 
import  Config  from '@/models/Config'; 
import { NextResponse } from 'next/server';
import { saveFile } from "../../../../local/local";
import stripe from "stripe";

const stripeApi = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export const POST = async (req, res) => {
  await connectMongoDB();
  const formData = await req.formData();

  const file = await formData.get("file");
  const jsonObject = await JSON.parse(formData.get("data"));

  console.log("File received ", file);
  console.log("JSON Object received ", jsonObject);

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const conf = await Config.findOne({ testId: "test13579" });
    
    const session = await stripeApi.checkout.sessions.create({
      success_url: process.env.DEV_URL,
      line_items: [
          {
              price: process.env.STRIPE_PRICE_ID,
              quantity: conf.currentAdCount,
          },
      ],
      mode: 'payment',
      customer_email: jsonObject.email,
    });

  //add a Post into database
    const post = new Post({
      sesionId : session.id,
      title: jsonObject.title,
      url: jsonObject.url,
      imageName: file.name,
      email: jsonObject.email
    });
    await post.save();
    const saved = await saveFile(file)
    
    if(saved && session && post){
      return NextResponse.json({ session }, {status: 200 });
    }
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};