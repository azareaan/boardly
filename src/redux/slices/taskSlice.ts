import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskInput {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  assignee: string;
}

interface TaskState {
  tasks: TaskInput[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskInput>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<TaskInput>) => {
      const index = state.tasks.findIndex(
        (task) => task.title === action.payload.title
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.title !== action.payload);
    },
  },
});

export const { addTask, editTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
