import Link from "next/link";
import { apiUrl } from "@/constants/api_constants";
import { Plus } from "lucide-react";

type CourseSummary = {
  id: string;
  title: string;
};

export default async function CoursesPage() {
  const res = await fetch(`${apiUrl}/api/courses`, { cache: 'no-store' });

  if (!res.ok) {
    return (
      <div className='p-6 text-red-600'>Failed to load courses</div>
    )
  }

  const courses: CourseSummary[] = await res.json();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">My Courses</h1>
        <Link 
          href="/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-primary font-semibold rounded-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-secondary italic mb-4">No courses available. Add your first course to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              href={`/courses/${course.id}`}
              className="p-6 bg-card-bg border border-border rounded-sm hover:border-accent transition-colors group"
            >
              <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {course.title}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}