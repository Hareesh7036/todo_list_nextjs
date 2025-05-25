import connectDB from "@/lib/db";
import Task from "@/models/task";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { task, description } = await req.json(); // Use req.json() in App Router
    if (!task || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    await connectDB();

    const existingTask = await Task.findOne({ task });
    if (existingTask) {
      return NextResponse.json(
        { error: "Task with this name already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Create new Task item
    const newTask = await Task.create({ task, description });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const searchText = searchParams.get('search');

    let tasks;

    if (searchText) {
      const regex = new RegExp(searchText, 'i');
      tasks = await Task.find({
        $or: [
          { task: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      }).select('task description _id');
    } else {
      tasks = await Task.find().select('task description _id');
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
