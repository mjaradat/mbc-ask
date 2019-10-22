import React, { Component } from 'react'

class QuestionField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
    }
  }

  render() {
    return (
      <form
        className="question-form"
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitQuestion(this.state.question)
          this.setState({ question: '' })
        }}
      >
        <div className="question-field">
          <label className="question-label" htmlFor="ask">Ask:</label>
          <input
            type="text"
            id={'ask'}
            placeholder={'Enter Question...'}
            value={this.state.question}
            onChange={e => this.setState({ question: e.target.value })}
          />
        </div>
        <div className="submit-question">
          <input type="submit" value={'Send'} />
        </div>
      </form>
    )
  }
}

export default QuestionField
