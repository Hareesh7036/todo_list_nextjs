import connectDB from "@/lib/db";
import Task from "@/models/task";

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { task, description } = await req.json(); // Use req.json() in App Router
    if (!task || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    await connectDB();

    // Create new Task item
    const newTask = await Task.create({ task, description });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().select('task description _id'); // Fetch all tasks and getting required properties
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
