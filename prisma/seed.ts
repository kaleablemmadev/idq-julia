import prisma from "../lib/prisma";
import { $Enums } from "../app/generated/prisma/client";

async function main() {
    const courses = [
        {
            title: "Intro to Interior Design Studio",
            semester: $Enums.Semester.SECOND,
            year: $Enums.StudyYear.SECOND_YEAR,
            instructor: "Prof. Elena Marsh",
            credits: 3,
            assignments: [
                {
                    title: "Space Planning Exercise: Small Studio Apartment",
                    dueDate: new Date("2026-10-10"),
                    status: $Enums.AssignmentStatus.NOT_STARTED
                },
                {
                    title: "Concept Board: Personal Design Philosophy",
                    dueDate: new Date("2026-07-22"),
                    status: $Enums.AssignmentStatus.IN_PROGRESS
                },
                {
                    title: "Furniture Layout & Circulation Plan",
                    dueDate: new Date("2026-10-20"),
                    status: $Enums.AssignmentStatus.DONE
                },
                {
                    title: "Final Studio Presentation: Micro-Living Unit",
                    dueDate: new Date("2026-12-05"),
                    status: $Enums.AssignmentStatus.IN_PROGRESS
                }
            ]
        },
        {
            title: "Design History I (Ancient to 19th Century)",
            semester: $Enums.Semester.FIRST,
            year: $Enums.StudyYear.THIRD_YEAR,
            instructor: "Dr. Raj Patel",
            credits: 2,
            assignments: [
                {
                    title: "Reading Response: Egyptian & Greek Interiors",
                    dueDate: new Date("2026-09-10"),
                    status: $Enums.AssignmentStatus.DONE
                },
                {
                    title: "Comparative Essay: Baroque vs. Neoclassical Interiors",
                    dueDate: new Date("2026-10-08"),
                    status: $Enums.AssignmentStatus.IN_PROGRESS
                },
                {
                    title: "Midterm Exam: Style Identification",
                    dueDate: new Date("2026-12-05"),
                    status: $Enums.AssignmentStatus.NOT_STARTED
                },
                {
                    title: "Research Paper: A Historical Design Movement of Choice",
                    dueDate: new Date("2026-12-30"),
                    status: $Enums.AssignmentStatus.IN_PROGRESS
                }
            ]
        },
        {
            title: "Materials & Construction Fundamentals",
            semester: $Enums.Semester.SECOND,
            year: $Enums.StudyYear.THIRD_YEAR,
            instructor: "Dr. Raj Patel",
            credits: 2,
            assignments: [
                {
                    title: "Material Sample Board: Textiles & Finishes",
                    dueDate: new Date("2026-09-10"),
                    status: $Enums.AssignmentStatus.DONE
                },
                {
                    title: "Sustainability Report: Comparing Two Flooring Materials",
                    dueDate: new Date("2026-10-08"),
                    status: $Enums.AssignmentStatus.IN_PROGRESS
                }
            ]
        }
    ];

    for (const { assignments, ...course } of courses) {
        await prisma.course.create({
            data: {
                ...course,
                semester: course.semester,
                year: course.year,
                assignments: {
                    create: assignments.map((a) => ({
                        ...a,
                        status: a.status,
                    })),
                },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });