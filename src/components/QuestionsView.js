import React, { Component } from 'react'

import { addQuestion, showQuestion } from 'actions';
import { connect } from 'react-redux';

import { Question } from 'components'

const URL = 'ws://127.0.0.1:1337'
const ws = new WebSocket(URL)


class QuestionsView extends Component {
    constructor() {
        super();
        this.state = {
            name: 'User',
            questions: [],
        }

    }

    componentDidMount() {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }
        console.log(ws)

        ws.onmessage = (evt) => {
            // on receiving a question, add it to the list ofquestions
            const { showQuestion } = this.props
            const question = JSON.parse(evt.data)
            if (question.canShow) {
                showQuestion(question)
            } else {
                addQuestion(question)
            }
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })
        }
    }

    render() {
        const { approvedQuestions } = this.props;
        return (
            <div>
                <h1>Show Me Page</h1>

                {approvedQuestions.map((question, index) =>
                    <div key={index} className={"approved-question-container"}>
                        <Question
                            question={question.question}
                            name={question.name}
                        />
                    </div>,
                )}
            </div>
        )
    }
}


const mapStateToProps = ({ UserQuestions: { approvedQuestions, questions } }) => ({
    questions,
    approvedQuestions
})

export default connect(mapStateToProps, { addQuestion, showQuestion })(QuestionsView);

