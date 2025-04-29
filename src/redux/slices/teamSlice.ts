import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamMemberInput } from "../../types/type";

interface TeamState {
  members: TeamMemberInput[];
}

const initialState: TeamState = {
  members: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<TeamMemberInput>) => {
      state.members.push(action.payload);
    },
    editMember: (state, action: PayloadAction<TeamMemberInput>) => {
      const index = state.members.findIndex(
        (member) => member.name === action.payload.name
      );
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(
        (member) => member.name !== action.payload
      );
    },
  },
});

export const { addMember, editMember, removeMember } = teamSlice.actions;
export default teamSlice.reducer;
