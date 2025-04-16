import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { UserState, Task, TeamMember, Project, UserData } from "../../types/type";

// Get the initial state from localStorage or set it to an empty array
const store = localStorage.getItem("user");
const initialState: UserState = store ? JSON.parse(store) : [];

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // add user
        addUser: (state, action: PayloadAction<UserData>) => {
            state.users.push(action.payload);
            localStorage.setItem("user", JSON.stringify(state));
        },
        
        // add project
        addProject: (state, action: PayloadAction<{ userId: number; project: Project }>) => {
            const { userId, project } = action.payload;
            const userIndex = state.users.findIndex(item => item.id === userId);
            
            if (userIndex !== -1) {
                state.users[userIndex].projects.push(project);
                localStorage.setItem("user", JSON.stringify(state));
            }
        },
        
        // add task to the project
        addTask: (state, action: PayloadAction<{ userId: number; projectId: number; task: Task }>) => {
            const { userId, projectId, task } = action.payload;
            const userIndex = state.users.findIndex(item => item.id === userId);
            
            if (userIndex !== -1) {
                const projectIndex = state.users[userIndex].projects.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    state.users[userIndex].projects[projectIndex].tasks.push(task);
                    localStorage.setItem("user", JSON.stringify(state));
                }
            }
        },
        
        // update task status
        updateTaskStatus: (state, action: PayloadAction<{ 
            userId: number; 
            projectId: number; 
            taskId: number; 
            status: "todo" | "doing" | "done" 
        }>) => {
            const { userId, projectId, taskId, status } = action.payload;
            const userIndex = state.users.findIndex(item => item.id === userId);
            
            if (userIndex !== -1) {
                const projectIndex = state.users[userIndex].projects.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    const taskIndex = state.users[userIndex].projects[projectIndex].tasks.findIndex(t => t.id === taskId);
                    
                    if (taskIndex !== -1) {
                        state.users[userIndex].projects[projectIndex].tasks[taskIndex].status = status;
                        localStorage.setItem("user", JSON.stringify(state));
                    }
                }
            }
        },
        
        // add team member to the project team
        addTeamMember: (state, action: PayloadAction<{ 
            userId: number; 
            projectId: number; 
            member: TeamMember 
        }>) => {
            const { userId, projectId, member } = action.payload;
            const userIndex = state.users.findIndex(item => item.id === userId);
            
            if (userIndex !== -1) {
                const projectIndex = state.users[userIndex].projects.findIndex(p => p.id === projectId);
                
                if (projectIndex !== -1) {
                    state.users[userIndex].projects[projectIndex].team.push(member);
                    localStorage.setItem("user", JSON.stringify(state));
                }
            }
        }
    }
});

export const userActions = userSlice.actions;