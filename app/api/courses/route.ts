import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/courses — list all courses
export async function GET() {
    try {
        const courses = await prisma.course.findMany();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// POST /api/courses — create a new course
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title) {
            return NextResponse.json({ error: "Please fill required inputs" }, { status: 400 });
        }

        const newCourse = await prisma.course.create({
            data: {
                title: body.title,
                semester: body.semester,
                year: body.year,
                credits: body.credits,
                instructor: body.instructor,
                assignments: body.assignments
                    ? { create: body.assignments }
                    : undefined
            }
        });

        return NextResponse.json(newCourse);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// DELETE /api/courses — bulk delete by ids
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: "Please provide an array of course ids" }, { status: 400 });
        }

        const multipleDelete = await prisma.course.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return NextResponse.json({ message: "Courses deleted successfully", deletedCount: multipleDelete.count });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}