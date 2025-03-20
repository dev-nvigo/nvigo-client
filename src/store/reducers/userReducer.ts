import { Action, UnknownAction } from "redux";

// ✅ Extend `UnknownAction`
export interface UserState {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    role?: "user" | "admin";
}

export interface UserAction extends Action, UnknownAction {
    type: "ADD_USER_DATA" | "DELETE_USER_DATA";
    payload?: UserState;
}

export default function userReducer(state: UserState = {}, action: UserAction): UserState {
    switch (action.type) {
        case "ADD_USER_DATA":
            return action.payload || {};
        case "DELETE_USER_DATA":
            return {};
        default:
            return state;
    }
}
