import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    email: string;
    full_name?: string;
    profile_completed?: boolean;
    current_status?: string;
    // Add any additional fields you store from Supabase or profile
};

type UserState = {
    user: User | null;
};

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
