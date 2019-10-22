import React, { Component } from 'react'
import { addQuestion, showQuestion } from 'actions';
import { connect } from 'react-redux';
import { Question } from 'components'

const URL = 'ws://127.0.0.1:1337'
const ws = new WebSocket(URL)



class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            isAdmin: false,
            name: 'Admin',
           questions: [],
        }
        this.apporveQuestion = this.apporveQuestion.bind(this)
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

    apporveQuestion(event, question){
        const { showQuestion } = this.props;
        event.preventDefault();
        console.log(question)
        question.canShow = true;
        ws.send(JSON.stringify(question))
        showQuestion(question)
    }

    render() {
        const {questions } = this.props;
        return (
            <div>
                <h1>Admin Page</h1>
                {questions.map((question, index) =>
                    <div key={index} className={"pending-question-container"}>
                        
                        <Question
                            question={question.question}
                            name={question.name}
                        />
                        <button
                            className={'show-question-button'}
                            onClick={(event) => {this.apporveQuestion(event, question)}}>
                            Show
                        </button>
                        <button
                            className={'skip-question-button'}
                            onClick={(event) => {this.apporveQuestion(event, question)}}>
                            Skip
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ UserQuestions: {questions } }) => ({ 
   questions
 })

export default connect(mapStateToProps, { addQuestion, showQuestion })(AdminPage);

