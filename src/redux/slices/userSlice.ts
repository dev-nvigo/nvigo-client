// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string | null;
    token: string | null; // or any other auth token you store
    isLoggedIn: boolean;
}

const initialState: UserState = {
    email: null,
    token: null,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ email: string; token: string }>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.email = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
