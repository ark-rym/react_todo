import React from 'react'
import propTypes from 'prop-types'

import Task from './task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task key={id} {...itemProps} onDeleted={() => onDeleted(id)} onToggleCompleted={() => onToggleCompleted(id)} />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  todos: [],
}

TaskList.propTypes = {
  onDeleted: propTypes.func,
  onToggleCompleted: propTypes.func,
  todos: propTypes.arrayOf(propTypes.object).isRequired,
}

export default TaskList
