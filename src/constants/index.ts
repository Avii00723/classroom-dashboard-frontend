export const DEPARTMENTS = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map(department => ({
    value: department.value,
    label: department.label,
}));