import { ADD_QUESTION } from '../types';

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        payload: {
            question,
        }
    }
}
export default addQuestion;