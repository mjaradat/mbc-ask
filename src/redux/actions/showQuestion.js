import { SHOW_QUESTION } from '../types';

function showQuestion(question) {
    return {
        type: SHOW_QUESTION,
        payload: {
            question,
        }
    }
}
export default showQuestion;