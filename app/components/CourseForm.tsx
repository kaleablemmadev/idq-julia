'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    semesterValues,
    studyYearValues,
    type AssignmentStatus,
    type Semester,
    type StudyYear,
} from "@/constants/courseEnums";

type CourseAssignmentData = {
    title: string;
    dueDate: string;
    status: AssignmentStatus;
    description?: string;
};

interface CoursePageProps {
    title: string;
    semester: Semester;
    year: StudyYear;
    credits: number;
    instructor: string;
    assignments?: CourseAssignmentData[];
};

interface CourseFormProps {
    initialData?: CoursePageProps;
    courseId?: string;
    onYearChange?: (year: StudyYear) => void;
    onSemesterChange?: (semester: Semester) => void;
};

export default function CourseForm({ initialData, courseId, onYearChange, onSemesterChange }: CourseFormProps) {
    // Navigation, then Editing or New Course
    const router = useRouter();
    const isEditMode = Boolean(courseId);

    // Course Form Contents
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [semester, setSemester] = useState<Semester>(initialData?.semester ?? semesterValues[0]);
    const [year, setYear] = useState<StudyYear>(initialData?.year ?? studyYearValues[0]);
    const [credits, setCredits] = useState(initialData?.credits ?? 0);
    const [instructor, setInstructor] = useState(initialData?.instructor ?? '');
    const [assignments] = useState<CourseAssignmentData[]>(initialData?.assignments ?? []);
    const yearOptions = studyYearValues;
    const semesterOptions = semesterValues;

    // Error handling
    const [error, setError] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const url = isEditMode ? `/api/courses/${courseId}` : '/api/courses';
        const method = isEditMode ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, semester, year, credits, instructor, assignments })
        });

        if(!res.ok) {
            const data = await res.json();
            setError(data.error || 'Something went wrong');
            return;
        }

        const savedCourse = await res.json();
        router.push(isEditMode ? `/courses/${savedCourse.id}` : '/courses');
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium text-primary">Course Title</label>
                <input 
                    id="title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Course Title"
                    className="px-4 py-3 bg-background border border-border rounded-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="instructor" className="text-sm font-medium text-primary">Instructor</label>
                <input 
                    id="instructor"
                    value={instructor} 
                    onChange={(e) => setInstructor(e.target.value)} 
                    placeholder="Instructor"
                    className="px-4 py-3 bg-background border border-border rounded-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="year" className="text-sm font-medium text-primary">Year</label>
                <select 
                    id="year" 
                    value={year} 
                    onChange={(e) => {
                        const selected = e.target.value as StudyYear;
                        setYear(selected);
                        onYearChange?.(selected);
                    }} 
                    className="px-4 py-3 bg-background border border-border rounded-sm text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                >
                    <option value="">Select a year</option>
                    {yearOptions.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>
                            {yearOption}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="semester" className="text-sm font-medium text-primary">Semester</label>
                <select 
                    id="semester" 
                    value={semester} 
                    onChange={(e) => {
                        const selected = e.target.value as Semester;
                        setSemester(selected);
                        onSemesterChange?.(selected);
                    }} 
                    className="px-4 py-3 bg-background border border-border rounded-sm text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                >
                    <option value="">Select a semester</option>
                    {semesterOptions.map((semesterOption) => (
                        <option key={semesterOption} value={semesterOption}>
                            {semesterOption}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="credits" className="text-sm font-medium text-primary">Credits</label>
                <input
                    id="credits"
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    placeholder="Credits"
                    className="px-4 py-3 bg-background border border-border rounded-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <button 
                type="submit"
                className="mt-2 px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-semibold rounded-sm transition-colors"
            >
                {isEditMode ? 'Save Changes' : 'Create Course'}
            </button>
        </form>
    )
}