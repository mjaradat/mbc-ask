import { combineReducers } from 'redux';
import UserQuestions from './UserQuestions';


const appReducer = combineReducers({
    UserQuestions
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};
export default rootReducer;