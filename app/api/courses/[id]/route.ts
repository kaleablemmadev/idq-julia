import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type CourseRouteContext = {
    params: Promise<{ id: string }>;
};

// GET /api/courses/[id] — get one course
export async function GET(_request: NextRequest, context: CourseRouteContext) {
    try {
        const { id } = await context.params;

        const course = await prisma.course.findUnique({
            where: {
                id
            },
            include: {
                assignments: {
                    orderBy: {
                        dueDate: 'asc'
                    }
                }
            }
        });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load course' }, { status: 500 });
    }
}

// PUT /api/courses/[id] — update one course
export async function PUT(request: NextRequest, context: CourseRouteContext) {
    try {
        const body = await request.json();
        const { id } = await context.params;

        const updatedCourse = await prisma.course.update({
            where: { id },
            data: {
                title: body.title,
                semester: body.semester,
                year: body.year,
                credits: body.credits,
                instructor: body.instructor,
                assignments: body.assignments
                    ? { create: body.assignments }
                    : undefined
            },
            include: {
                assignments: {
                    orderBy: {
                        dueDate: 'asc'
                    }
                }
            }
        });

        return NextResponse.json(updatedCourse);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
    }
}

// DELETE /api/courses/[id] — delete one course
export async function DELETE(_request: NextRequest, context: CourseRouteContext) {
    try {
        const { id } = await context.params;

        await prisma.course.delete({
            where: {
                id
            }
        });

        return NextResponse.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
    }
}