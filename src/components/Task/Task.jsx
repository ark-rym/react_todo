import React, { Component } from 'react'
import propTypes from 'prop-types'

import './Task.scss'

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    label: '',
    completed: false,
    date: '',
  }

  static propTypes = {
    onDeleted: propTypes.func,
    onToggleCompleted: propTypes.func,
    label: propTypes.string,
    completed: propTypes.bool,
    date: propTypes.string,
  }

  render() {
    const { label, onDeleted, onToggleCompleted, completed, date } = this.props

    let classNames = 'active'
    if (completed) {
      classNames = 'completed'
    }

    return (
      <li className={classNames}>
        <div className="view" onClick={onToggleCompleted}>
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} id="" />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {date}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    )
  }
}
