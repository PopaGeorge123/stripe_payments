export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sendNewsletterMail } from "@/libs/emails";
import { cp } from "fs";

export async function GET(request) {

    const user = {
        email: "vedacms@gmail.com",
        title: "Moonlink",
    };

    const lastBuyer = {
        url: "https://www.tinrocket.com/apps/photo-tape/",
    };

    await sendNewsletterMail(user.email, user.title, lastBuyer.url);
    console.log("Email sent to ", user.email);

  return new NextResponse({status:"success"}, { status: 200 });
}