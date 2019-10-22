import { ADD_QUESTION, SHOW_QUESTION } from '../types'

const initialState = {
    questions: [],
    approvedQuestions: []
};

const UserQuestions = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                questions: [...state.questions, action.payload.question],
                approvedQuestions: [...state.approvedQuestions]
            };
        case SHOW_QUESTION:
            console.log({ state });
            return {
                questions: [...state.questions],
                approvedQuestions: [...state.approvedQuestions, action.payload.question]
            };
        default:
            return state;
    }
}
export default UserQuestions;
