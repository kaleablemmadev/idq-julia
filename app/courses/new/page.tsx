import Link from 'next/link';
import CourseForm from '@/components/CourseForm';
import { ArrowLeft } from 'lucide-react';

export default function NewCoursePage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Add New Course</h1>

        <div className="bg-card-bg border border-border rounded-sm p-6 sm:p-8">
          <CourseForm />
        </div>
      </div>
    </div>
  );
}