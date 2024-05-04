import { NextResponse } from "next/server";
import { saveFile , cleanFolder } from "@/local/local";

export async function GET(request) {
    //"chart.png"
    await cleanFolder("down.svg")
    
    return new NextResponse(null, { status: 200 });
}