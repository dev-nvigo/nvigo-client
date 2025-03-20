export default function userReducer(state = {}, action: any) {
    switch (action.type) {
        case "AddUserData":
            return action?.payload;
        case "DelteUserData":
            return {};
        default:
            return state;
    }
}
