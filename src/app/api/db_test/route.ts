import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const db_connection= await connectDB();
    return new NextResponse('connected');
}