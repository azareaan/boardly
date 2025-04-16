import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});