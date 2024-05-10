export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sendNewsletterMail } from "@/libs/emails";
import { cp } from "fs";

export async function GET(request) {

    const user = {
        email: "testservices430@gmail.com",
        title: "Hello",
    };

    const lastBuyer = {
        url: "https://www.google.com",
    };

    await sendNewsletterMail(user.email, user.title, lastBuyer.url);
    console.log("Email sent to ", user.email);

  return new NextResponse({status:"success"}, { status: 200 });
}