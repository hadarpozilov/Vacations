import { combineReducers, createStore } from "redux";
import { vacationsReducer } from "./VacationsState";
import { AuthReducer } from "./AuthState"
import { followReducer } from "./FollowState";

const reducers = combineReducers({
    VacationsState: vacationsReducer,
    authState: AuthReducer,
    followState: followReducer
})
const store = createStore(reducers)
export default store;