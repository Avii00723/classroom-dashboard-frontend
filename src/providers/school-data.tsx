import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

export type SchoolRole = "admin" | "teacher" | "student";
export type RecordStatus = "active" | "inactive";

export type SchoolUser = {
    id: string;
    name: string;
    email: string;
    role: SchoolRole;
    departmentId: string;
    status: RecordStatus;
    joinedAt: string;
    initials: string;
};

export type SchoolDepartment = {
    id: string;
    name: string;
    code: string;
    description: string;
    color: string;
};

export type SchoolSubject = {
    id: string;
    name: string;
    code: string;
    departmentId: string;
    credits: number;
    status: RecordStatus;
};

export type SchoolSchedule = {
    day: string;
    time: string;
};

export type SchoolClass = {
    id: string;
    name: string;
    subjectId: string;
    teacherId: string;
    departmentId: string;
    term: string;
    room: string;
    capacity: number;
    inviteCode: string;
    status: RecordStatus;
    schedules: SchoolSchedule[];
    createdAt: string;
};

export type SchoolData = {
    users: SchoolUser[];
    departments: SchoolDepartment[];
    subjects: SchoolSubject[];
    classes: SchoolClass[];
    enrollments: Record<string, string[]>;
};

type Activity = { id: string; label: string; detail: string; time: string; tone: "blue" | "green" | "amber" | "purple" };

const seedData: SchoolData = {
    departments: [
        { id: "dept-eng", name: "Engineering", code: "ENG", description: "Design, computing, and applied engineering disciplines.", color: "#2563eb" },
        { id: "dept-sci", name: "Natural Sciences", code: "SCI", description: "Research-led study of the natural world.", color: "#0f766e" },
        { id: "dept-art", name: "Arts & Humanities", code: "ART", description: "Culture, communication, and creative practice.", color: "#c2410c" },
        { id: "dept-bus", name: "Business", code: "BUS", description: "Leadership, markets, and responsible enterprise.", color: "#7c3aed" },
        { id: "dept-math", name: "Mathematics", code: "MAT", description: "Pure and applied mathematical thinking.", color: "#be123c" },
    ],
    users: [
        { id: "usr-1", name: "Maya Thompson", email: "maya.thompson@northstar.edu", role: "admin", departmentId: "dept-eng", status: "active", joinedAt: "2024-08-12", initials: "MT" },
        { id: "usr-2", name: "Daniel Kim", email: "daniel.kim@northstar.edu", role: "teacher", departmentId: "dept-eng", status: "active", joinedAt: "2024-08-18", initials: "DK" },
        { id: "usr-3", name: "Amara Okafor", email: "amara.okafor@northstar.edu", role: "teacher", departmentId: "dept-sci", status: "active", joinedAt: "2024-08-22", initials: "AO" },
        { id: "usr-4", name: "Jon Bell", email: "jon.bell@northstar.edu", role: "teacher", departmentId: "dept-bus", status: "active", joinedAt: "2024-09-01", initials: "JB" },
        { id: "usr-5", name: "Sofia Martins", email: "sofia.martins@northstar.edu", role: "teacher", departmentId: "dept-art", status: "inactive", joinedAt: "2024-09-04", initials: "SM" },
        { id: "usr-6", name: "Eli Carter", email: "eli.carter@student.northstar.edu", role: "student", departmentId: "dept-eng", status: "active", joinedAt: "2025-01-08", initials: "EC" },
        { id: "usr-7", name: "Nora Patel", email: "nora.patel@student.northstar.edu", role: "student", departmentId: "dept-sci", status: "active", joinedAt: "2025-01-08", initials: "NP" },
        { id: "usr-8", name: "Liam Garcia", email: "liam.garcia@student.northstar.edu", role: "student", departmentId: "dept-eng", status: "active", joinedAt: "2025-01-10", initials: "LG" },
        { id: "usr-9", name: "Priya Shah", email: "priya.shah@student.northstar.edu", role: "student", departmentId: "dept-bus", status: "active", joinedAt: "2025-01-11", initials: "PS" },
        { id: "usr-10", name: "Noah Williams", email: "noah.williams@student.northstar.edu", role: "student", departmentId: "dept-art", status: "active", joinedAt: "2025-01-15", initials: "NW" },
        { id: "usr-11", name: "Grace Lee", email: "grace.lee@student.northstar.edu", role: "student", departmentId: "dept-math", status: "active", joinedAt: "2025-01-16", initials: "GL" },
        { id: "usr-12", name: "Owen Brooks", email: "owen.brooks@student.northstar.edu", role: "student", departmentId: "dept-eng", status: "inactive", joinedAt: "2025-01-20", initials: "OB" },
    ],
    subjects: [
        { id: "sub-1", name: "Product Design Studio", code: "ENG-210", departmentId: "dept-eng", credits: 4, status: "active" },
        { id: "sub-2", name: "Data Structures", code: "ENG-240", departmentId: "dept-eng", credits: 4, status: "active" },
        { id: "sub-3", name: "Environmental Biology", code: "SCI-125", departmentId: "dept-sci", credits: 3, status: "active" },
        { id: "sub-4", name: "Brand Strategy", code: "BUS-318", departmentId: "dept-bus", credits: 3, status: "active" },
        { id: "sub-5", name: "Modern Storytelling", code: "ART-202", departmentId: "dept-art", credits: 3, status: "active" },
        { id: "sub-6", name: "Applied Statistics", code: "MAT-205", departmentId: "dept-math", credits: 4, status: "inactive" },
    ],
    classes: [
        { id: "class-1", name: "Product Design Studio / A", subjectId: "sub-1", teacherId: "usr-2", departmentId: "dept-eng", term: "Spring 2025", room: "Studio 04", capacity: 24, inviteCode: "DESIGN25", status: "active", schedules: [{ day: "Tue", time: "09:00 - 10:30" }, { day: "Thu", time: "09:00 - 10:30" }], createdAt: "2025-01-04" },
        { id: "class-2", name: "Data Structures / B", subjectId: "sub-2", teacherId: "usr-2", departmentId: "dept-eng", term: "Spring 2025", room: "Lab 12", capacity: 30, inviteCode: "TREES25", status: "active", schedules: [{ day: "Mon", time: "13:00 - 14:30" }, { day: "Wed", time: "13:00 - 14:30" }], createdAt: "2025-01-05" },
        { id: "class-3", name: "Environmental Biology / A", subjectId: "sub-3", teacherId: "usr-3", departmentId: "dept-sci", term: "Spring 2025", room: "Science 08", capacity: 20, inviteCode: "ECOLOGY5", status: "active", schedules: [{ day: "Tue", time: "11:00 - 12:30" }], createdAt: "2025-01-06" },
        { id: "class-4", name: "Brand Strategy / A", subjectId: "sub-4", teacherId: "usr-4", departmentId: "dept-bus", term: "Spring 2025", room: "Hall 02", capacity: 18, inviteCode: "BRAND25", status: "active", schedules: [{ day: "Wed", time: "10:00 - 11:30" }], createdAt: "2025-01-08" },
        { id: "class-5", name: "Modern Storytelling / A", subjectId: "sub-5", teacherId: "usr-5", departmentId: "dept-art", term: "Spring 2025", room: "Arts 03", capacity: 16, inviteCode: "STORY25", status: "inactive", schedules: [{ day: "Fri", time: "14:00 - 16:00" }], createdAt: "2025-01-09" },
        { id: "class-6", name: "Data Structures / A", subjectId: "sub-2", teacherId: "usr-2", departmentId: "dept-eng", term: "Spring 2025", room: "Lab 11", capacity: 28, inviteCode: "STACK25", status: "active", schedules: [{ day: "Tue", time: "15:00 - 16:30" }], createdAt: "2025-01-12" },
    ],
    enrollments: {
        "class-1": ["usr-6", "usr-8", "usr-12", "usr-9", "usr-10", "usr-11"],
        "class-2": ["usr-6", "usr-8", "usr-12", "usr-11"],
        "class-3": ["usr-7", "usr-10", "usr-11"],
        "class-4": ["usr-9", "usr-10"],
        "class-5": ["usr-10"],
        "class-6": ["usr-6", "usr-8", "usr-11"],
    },
};

const storageKey = "northstar-classroom-data";

type SchoolDataContext = SchoolData & {
    activities: Activity[];
    addRecord: (resource: keyof Pick<SchoolData, "users" | "departments" | "subjects" | "classes">, values: Record<string, unknown>) => string;
    updateRecord: (resource: keyof Pick<SchoolData, "users" | "departments" | "subjects" | "classes">, id: string, values: Record<string, unknown>) => void;
    deleteRecord: (resource: keyof Pick<SchoolData, "users" | "departments" | "subjects" | "classes">, id: string) => { ok: boolean; reason?: string };
    enrollStudent: (classId: string, userId: string) => { ok: boolean; reason?: string };
    unenrollStudent: (classId: string, userId: string) => void;
    generateInviteCode: (classId: string) => void;
};

const SchoolDataContext = createContext<SchoolDataContext | null>(null);

const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
const makeCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export function SchoolDataProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<SchoolData>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) as SchoolData : seedData;
        } catch {
            return seedData;
        }
    });

    useEffect(() => localStorage.setItem(storageKey, JSON.stringify(data)), [data]);

    const mutate = (callback: (current: SchoolData) => SchoolData) => setData((current) => callback(current));

    const value = useMemo<SchoolDataContext>(() => ({
        ...data,
        activities: [
            { id: "activity-1", label: "New class published", detail: "Product Design Studio / A", time: "12 min ago", tone: "blue" },
            { id: "activity-2", label: "Enrollment nearing capacity", detail: "Product Design Studio / A is at 75%", time: "38 min ago", tone: "amber" },
            { id: "activity-3", label: "Teacher profile updated", detail: "Amara Okafor joined Natural Sciences", time: "2 hrs ago", tone: "green" },
            { id: "activity-4", label: "Subject archived", detail: "Applied Statistics", time: "Yesterday", tone: "purple" },
        ],
        addRecord: (resource, values) => {
            const id = makeId(resource.slice(0, -1));
            mutate((current) => {
                const next = { ...values, id } as never;
                return { ...current, [resource]: [...current[resource], next] };
            });
            if (resource === "classes") mutate((current) => ({ ...current, enrollments: { ...current.enrollments, [id]: [] } }));
            return id;
        },
        updateRecord: (resource, id, values) => mutate((current) => ({ ...current, [resource]: current[resource].map((item) => item.id === id ? { ...item, ...values } : item) })),
        deleteRecord: (resource, id) => {
            if (resource === "departments" && (data.subjects.some((item) => item.departmentId === id) || data.users.some((item) => item.departmentId === id))) return { ok: false, reason: "This department is still assigned to users or subjects." };
            if (resource === "subjects" && data.classes.some((item) => item.subjectId === id)) return { ok: false, reason: "This subject is still used by one or more classes." };
            if (resource === "users" && (data.classes.some((item) => item.teacherId === id) || Object.values(data.enrollments).some((students) => students.includes(id)))) return { ok: false, reason: "This user is assigned to a class or enrollment." };
            if (resource === "classes" && (data.enrollments[id]?.length ?? 0) > 0) return { ok: false, reason: "Unenroll all students before deleting this class." };
            mutate((current) => ({ ...current, [resource]: current[resource].filter((item) => item.id !== id) }));
            return { ok: true };
        },
        enrollStudent: (classId, userId) => {
            const classroom = data.classes.find((item) => item.id === classId);
            const current = data.enrollments[classId] ?? [];
            if (current.includes(userId)) return { ok: false, reason: "Student is already enrolled." };
            if (classroom && current.length >= classroom.capacity) return { ok: false, reason: "This class has reached capacity." };
            mutate((state) => ({ ...state, enrollments: { ...state.enrollments, [classId]: [...(state.enrollments[classId] ?? []), userId] } }));
            return { ok: true };
        },
        unenrollStudent: (classId, userId) => mutate((state) => ({ ...state, enrollments: { ...state.enrollments, [classId]: (state.enrollments[classId] ?? []).filter((id) => id !== userId) } })),
        generateInviteCode: (classId) => mutate((state) => ({ ...state, classes: state.classes.map((item) => item.id === classId ? { ...item, inviteCode: makeCode() } : item) })),
    }), [data]);

    return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>;
}

export function useSchoolData() {
    const value = useContext(SchoolDataContext);
    if (!value) throw new Error("useSchoolData must be used within SchoolDataProvider");
    return value;
}

export function getDepartmentName(data: SchoolData, id: string) {
    return data.departments.find((item) => item.id === id)?.name ?? "Unassigned";
}

export function getSubjectName(data: SchoolData, id: string) {
    return data.subjects.find((item) => item.id === id)?.name ?? "Unknown subject";
}

export function getUserName(data: SchoolData, id: string) {
    return data.users.find((item) => item.id === id)?.name ?? "Unknown user";
}