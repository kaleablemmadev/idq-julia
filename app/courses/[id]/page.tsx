'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

interface CoursePageProps {
    id?: string;
    title: string;
    semester: string;
    year: string;
    credits: number;
    instructor: string;
}

export default function CoursePage() {
    const params = useParams<{ id?: string }>();
    const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [course, setCourse] = useState<CoursePageProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            return;
        }

        async function fetchCourse() {
            try {
                setIsLoading(true);
                setError(null);

                const res = await fetch(`../api/courses/${courseId}`, { cache: "no-store" });

                if (!res.ok) {
                    throw new Error("Failed to load course");
                }

                const data: CoursePageProps = await res.json();
                setCourse(data);
            } catch (err) {
                setCourse(null);
                setError(err instanceof Error ? err.message : "Failed to load course");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourse();
    }, [courseId]);

    if (!courseId) return <div className="p-6">Course id is missing</div>;
    if (isLoading) return <div className="p-6 text-secondary">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!course) return <div className="p-6">Course not found</div>;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-6">
                <Link 
                    href="../courses"
                    className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">{course.title}</h1>
                <div className="flex items-center gap-2">
                    <Link 
                        href={`../courses/${courseId}/edit`}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-accent text-primary font-medium rounded-sm transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-6 bg-card-bg border border-border rounded-sm">
                    <p className="text-sm text-secondary mb-1">Instructor</p>
                    <p className="text-base font-semibold text-primary">{course.instructor}</p>
                </div>
                <div className="p-6 bg-card-bg border border-border rounded-sm">
                    <p className="text-sm text-secondary mb-1">Semester</p>
                    <p className="text-base font-semibold text-primary">{course.semester}</p>
                </div>
                <div className="p-6 bg-card-bg border border-border rounded-sm">
                    <p className="text-sm text-secondary mb-1">Year</p>
                    <p className="text-base font-semibold text-primary">{course.year}</p>
                </div>
                <div className="p-6 bg-card-bg border border-border rounded-sm">
                    <p className="text-sm text-secondary mb-1">Credits</p>
                    <p className="text-base font-semibold text-primary">{course.credits}</p>
                </div>
            </div>
        </div>
    );
}