import React, { Component } from 'react'

import { addQuestion } from 'actions';
import { connect } from 'react-redux';

import { QuestionField } from 'components'

const URL = 'ws://127.0.0.1:1337'
const ws = new WebSocket(URL)

class AskPage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            questions: [],
        }

        this.submitQuestion = this.submitQuestion.bind(this)
    }

    componentDidMount() {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }
        console.log(ws)

        ws.onmessage = (evt) => {
            // on receiving a question, add it to the list ofquestions
            const { addQuestion } = this.props
            const question = JSON.parse(evt.data)
            addQuestion(question)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })
        }
    }


    submitQuestion(questionString) {
        // on submitting the QuestionField form, send the question, add it to the list and reset the input
        if (!questionString) {
            alert("Please ask a question!")
            return;
        }
        const { questions, addQuestion } = this.props
        const question = { id: questions.length + 1, name: this.state.name, question: questionString, canShow: false }
        ws.send(JSON.stringify(question))
        addQuestion(question)
    }

    render() {
        return (
            <div>
                <h1>Ask Me Page</h1>
                <div>
                    {/* <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id={'name'}
                            placeholder={'Enter your name...'}
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div> */}

                    <QuestionField
                        ws={ws}
                        onSubmitQuestion={questionString => this.submitQuestion(questionString)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ UserQuestions: { questions } }) => ({
    questions
})

export default connect(mapStateToProps, { addQuestion })(AskPage);

