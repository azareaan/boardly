export type Task = {
    id: number;
    name: string;
    description: string;
    status: "todo" | "doing" | "done";
    priority: "low" | "medium" | "high";
    deadline?: Date;
    responsible: string;
};
export interface TaskInput {
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    assignee: string;
  }
  

  export interface TeamMember {
    id: string;
    name: string;
    role: string;
  }
  
  export interface TeamMemberInput {
    name: string;
    role: string;
  }

export type Project = {
    id: number;
    name: string;
    description: string;
    dateModified: Date;
    tasks?: Task[];
    team: TeamMember[]; 
};

export type UserData = {
    name: string;
    email: string;
    pass: string;
    role: "admin";
    projects?: Project[];
};

export type UserState = {
    users: UserData[];
};