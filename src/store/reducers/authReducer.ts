import { Action, UnknownAction } from "redux";

// ✅ Extend `UnknownAction` to satisfy Redux Toolkit
export interface AuthAction extends Action, UnknownAction {
    type: "USER_LOGGED_IN" | "USER_LOGGED_OUT";
}

export type AuthState = boolean;

export default function authReducer(state: AuthState = false, action: AuthAction): AuthState {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return true;
        case "USER_LOGGED_OUT":
            return false;
        default:
            return state;
    }
}
