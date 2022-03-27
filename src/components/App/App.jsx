import React, { Component } from 'react'
import './App.scss'
import { formatDistanceToNow } from 'date-fns'

import { NewTaskForm } from '../NewTaskForm'
import { TaskList } from '../TaskList'
import { Footer } from '../Footer'

export default class App extends Component {
  maxId = 100
  date5 = new Date()
  state = {
    todoData: [
      this.createTodoItem('Completed task', this.date5),
      this.createTodoItem('Editing task', this.date5),
      this.createTodoItem('Active task', this.date5),
    ],
    filter: 'all',
  }

  createTodoItem(label, createDate) {
    console.log(createDate)
    const date = formatDistanceToNow(new Date(createDate), { addSuffix: true, includeSeconds: true })
    return {
      label: label,
      completed: false,
      id: this.maxId++,
      date: date,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const arrBefore = todoData.slice(0, idx)
      const arrAfter = todoData.slice(idx + 1)
      const newArr = [...arrBefore, ...arrAfter]
      return {
        todoData: newArr,
      }
    })
  }

  addItem = (text, createDate) => {
    const newItem = this.createTodoItem(text, createDate)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  clearAllCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed)
      return {
        todoData: newArr,
      }
    })
  }

  onFilterItems = (filter) => {
    this.setState({ filter })
  }

  filterItems(todoData, filter) {
    if (filter === 'all') {
      return todoData
    } else if (filter === 'active') {
      return todoData.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return todoData.filter((el) => el.completed)
    }
  }

  render() {
    const { todoData, filter } = this.state
    const completedCount = this.state.todoData.filter((el) => !el.completed).length
    const visibleItems = this.filterItems(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList onDeleted={this.deleteItem} onToggleCompleted={this.onToggleCompleted} todos={visibleItems} />
          <Footer
            completedCount={completedCount}
            onClearAllCompleted={this.clearAllCompleted}
            onFilterItems={this.onFilterItems}
            filter={filter}
          />
        </section>
      </section>
    )
  }
}
