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

  // editItem = (e) => {
  //   e.pre
  // }

  render() {
    const { itemProps, onDeleted, onToggleCompleted, onEdit } = this.props

    const { label, completed, date, id } = itemProps

    let classNames = ' '
    if (completed) {
      classNames += 'completed'
    }

    return (
      <li className={classNames}>
        <div className="view" >
          <input 
            className="toggle" 
            type="checkbox"
            onClick={onToggleCompleted} 
            id={id} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {date}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    )
  }
}
