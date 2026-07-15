import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { useParams } from "next/navigation";

/*
    ALL ASSIGNMENTS
*/

// GET /api/assignments - list all assignments
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('courseId');

        const assignments = await prisma.assignment.findMany({
            where: courseId ? { courseId } : undefined,
        });

        return NextResponse.json(assignments);
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}

// POST /api/assignments - create a new assignment
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if(!body.title) {
            return NextResponse.json({ error: "Please fill required inputs"}, {status: 400});
        }

        const newAssignment = await prisma.assignment.create({
            data: {
                title: body.title,
                description: body.description ? body.description : null,
                dueDate: body.dueDate,
                status: body.status,
                courseId: body.courseId
            }
        });

        return NextResponse.json(newAssignment);
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

// DELETE /api/assignments - bulk delete by ids
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({error: "Please provide an array of assignments"}, {status: 400})
        }

        const multipleDelete = await prisma.assignment.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return NextResponse.json({message: "Assignments deleted successfully", deletedCount: multipleDelete.count})
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

/*
    ASSIGNMENTS IN SPECIFIC COURSES
*/

// GET 