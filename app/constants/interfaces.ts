import type { Semester, StudyYear } from './courseEnums';

export interface CoursePageProps {
    id?: string;
    title: string;
    semester: Semester;
    year: StudyYear;
    credits: number;
    instructor: string;
}