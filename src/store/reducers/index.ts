import { combineReducers, Action, UnknownAction } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer, { AuthAction, AuthState } from "./authReducer";
import userReducer, { UserAction, UserState } from "./userReducer";

// ✅ Extend `UnknownAction`
interface LogoutAction extends Action, UnknownAction {
    type: "LOGOUT";
}

// ✅ Ensure `RootAction` is assignable to `UnknownAction`
export type RootAction = AuthAction | UserAction | LogoutAction;

export interface RootState {
    auth: AuthState;
    user: UserState;
}

// ✅ Combine Reducers
const appReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage,
    whitelist: ["auth", "user"],
};

// ✅ Fix: Ensure `LOGOUT` action doesn't go to `combineReducers`
const rootReducer = (state: RootState | undefined, action: RootAction): RootState => {
    if (action.type === "LOGOUT") {
        storage.removeItem("persist:root");
        return appReducers(undefined, { type: "@@INIT" } as AuthAction & UserAction);
    }
    return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);
