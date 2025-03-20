export default function authReducer(state = false, action: any) {
    switch (action.type) {
        case "userLoggedIn":
            return true;
        case "userLoggedOut":
            return false;
        default:
            return state;
    }
}
