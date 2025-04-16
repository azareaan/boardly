export type Task = {
    id: number;
    name: string;
    description: string;
    status: "todo" | "doing" | "done";
    priority: "low" | "medium" | "high";
    deadline?: Date;
    responsible: string;
};

export type TeamMember = {
    id: number;
    name: string;
    role: "admin" | "user";
};

export type Project = {
    id: number;
    name: string;
    description: string;
    dateModified: Date;
    tasks: Task[];
    team: TeamMember[];
};

export type UserData = {
    id: number;
    name: string;
    email: string;
    pass: string;
    role: "admin";
    projects: Project[];
};

export type UserState = {
    users: UserData[];
};