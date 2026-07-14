export const semesterValues = ['FIRST', 'SECOND'] as const;
export type Semester = (typeof semesterValues)[number];

export const studyYearValues = [
  'FRESHMAN',
  'SECOND_YEAR',
  'THIRD_YEAR',
  'FOURTH_YEAR',
  'FIFTH_YEAR',
  'SIXTH_YEAR',
  'SEVENTH_YEAR',
] as const;
export type StudyYear = (typeof studyYearValues)[number];

export const assignmentStatusValues = ['NOT_STARTED', 'IN_PROGRESS', 'DONE'] as const;
export type AssignmentStatus = (typeof assignmentStatusValues)[number];
