import React, { Component } from 'react'
import './new-task-form.css'
import propTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: propTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const date = new Date()
    this.props.onItemAdded(this.state.label, date)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}
