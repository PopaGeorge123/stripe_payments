import { NextResponse } from "next/server";
import { sendNewsletterMail } from "@/libs/emails";

export async function GET(request) {
  await sendNewsletterMail("popageo02@gmail.com");

  return new NextResponse({message:"Success"}, { status: 200 });
}