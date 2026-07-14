'use client'

import Link from "next/link";
import CourseForm from "@/app/components/CourseForm";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { CoursePageProps } from '@/constants/interfaces';
import { ArrowLeft } from 'lucide-react';

export default function EditCoursePage() {
    const params = useParams<{ id?: string }>();
    const id = params.id;
    const router = useRouter();

    const [course, setCourse] = useState<CoursePageProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            router.push('/courses');
            return;
        }

        async function fetchCourse() {
            try {
                setIsLoading(true);

                const res = await fetch(`/api/courses/${id}`, { cache: "no-store" });

                if (!res.ok) {
                    throw new Error("Failed to load course");
                }

                const data: CoursePageProps = await res.json();
                setCourse(data);
            } catch {
                router.push('/courses');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourse();
    }, [id, router]);

    if (isLoading === false && !course) {
        return (
            <div className="text-red-600 p-6">Failed to load course</div>
        )
    }

    if (isLoading) {
        return (
            <div className="text-secondary p-6">Loading...</div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-6">
                <Link 
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Link>
            </div>

            <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Edit Course</h1>

                <div className="bg-card-bg border border-border rounded-sm p-6 sm:p-8">
                    <CourseForm
                        initialData={course ?? undefined}
                        courseId={id}
                    />
                </div>
            </div>
        </div>
    )
}