import React from "react"
import { ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Components/Button"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EDitableSpan"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todoListId: string
    filter: FilterValuesType
    title: string
    tasks: TasksType[]
    changeTodolistFilter: (nextFilter: FilterValuesType, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todoListId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const addTaskTitle = (newTitle: string) => props.addTask(newTitle, props.todoListId)
    const onClickRemoveTodolistHandler = () => props.removeTodoList(props.todoListId)

    const changeFilterHandlerCreator = (FilterValue: FilterValuesType) =>
        () => props.changeTodolistFilter(FilterValue, props.todoListId)

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TasksType) => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todoListId)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        const taskClass = t.isDone ? 'task-isDone' : 'task'

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todoListId, t.id, title)
        }


        return (
            <li key={t.id} className={taskClass}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const taskList: JSX.Element = props.tasks.length
        ? <ul>{tasksList}</ul> : <span>Your tasks list is empty</span>

    const changeTodoTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle} />
                <button onClick={onClickRemoveTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskTitle} />
            {taskList}
            <div>
                <Button name={'All'} callBack={changeFilterHandlerCreator("All")} />
                <Button name={'Active'} callBack={changeFilterHandlerCreator("Active")} />
                <Button name={'Completed'} callBack={changeFilterHandlerCreator("Completed")} />
            </div>
        </div>
    )
}