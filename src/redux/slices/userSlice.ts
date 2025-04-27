import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { UserState, Task, TeamMember, Project, UserData } from "../../types/type";

// Get the initial state from localStorage or set it to an empty array
const store = localStorage.getItem("users");
const initialState: UserState = store ? JSON.parse(store) : { users: [] };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Authentication: (state, action: PayloadAction<{ email: string; pass: string }>) => {
            const { email, pass } = action.payload;
            const userIndex: number = state.users.findIndex(item => item.email === email);
            if (userIndex !== -1) {
                if (state.users[userIndex].pass === pass) {
                    localStorage.setItem("auth", JSON.stringify({auth: "true", userIndex: userIndex}));
                    window.location.href = "/";
                } else {
                    alert("Wrong password");
                    localStorage.setItem("auth", JSON.stringify({auth: "false", userIndex: -1}));
                }
                
            } else {
                localStorage.setItem("auth", JSON.stringify({auth: "false", userIndex: -1}));           
            }
        },
        // add user
        addUser: (state, action: PayloadAction<UserData>) => {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state));
            window.location.href = "/login";
        },
        
        // add project
        addProject: (state, action: PayloadAction<{ email: string; project: Project }>) => {
            const { email, project } = action.payload;
            const userIndex: number = state.users.findIndex(item => item.email === email);
            
            if (userIndex !== -1) {
                state.users[userIndex].projects?.push(project);
                localStorage.setItem("users", JSON.stringify(state));
            }
        },
        
        // add task to the project
        addTask: (state, action: PayloadAction<{ email: string; projectId: number; task: Task }>) => {
            const { email, projectId, task } = action.payload;
            const userIndex = state.users.findIndex(item => item.email === email);
            
            if (userIndex !== -1) {
                const projectIndex:number = state.users[userIndex].projects!.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    state.users[userIndex].projects![projectIndex].tasks!.push(task);
                    localStorage.setItem("users", JSON.stringify(state));
                }
            }
        },
        
        // update task status
        updateTaskStatus: (state, action: PayloadAction<{ 
            email: string; 
            projectId: number; 
            taskId: number; 
            status: "todo" | "doing" | "done" 
        }>) => {
            const { email, projectId, taskId, status } = action.payload;
            const userIndex = state.users.findIndex(item => item.email === email);
            
            if (userIndex !== -1) {
                const projectIndex: number = state.users[userIndex].projects!.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    const taskIndex: number = state.users[userIndex].projects![projectIndex].tasks!.findIndex(t => t.id === taskId);
                    
                    if (taskIndex !== -1) {
                        state.users[userIndex].projects![projectIndex].tasks![taskIndex].status = status;
                        localStorage.setItem("users", JSON.stringify(state));
                    }
                }
            }
        },
        
        // add team member to the project team
        addTeamMember: (state, action: PayloadAction<{ 
            email: string; 
            projectId: number; 
            member: TeamMember 
        }>) => {
            const { email, projectId, member } = action.payload;
            const userIndex = state.users.findIndex(item => item.email === email);
            
            if (userIndex !== -1) {
                const projectIndex: number = state.users[userIndex].projects!.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    state.users![userIndex].projects![projectIndex].team.push(member);
                    localStorage.setItem("users", JSON.stringify(state));
                }
            }
        }
    }
});

export const userActions = userSlice.actions;