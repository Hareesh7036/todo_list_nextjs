import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/task";
import { Types } from "mongoose";
import { requireAuth } from "@/lib/auth/check-auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { response } = await requireAuth();
  if (response) {
    return response;
  }
  try {
    const { id } = params;
    const { task, description } = await req.json();

    if (!task && !description) {
      return NextResponse.json(
        { error: "At least one of 'task' or 'description' must be provided." },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...(task && { task }), ...(description && { description }) },
      { new: true }, // return the updated document
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { response } = await requireAuth();
  if (response) {
    return response;
  }
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    await connectDB();

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
