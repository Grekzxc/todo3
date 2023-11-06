import React from "react"
import { ChangeEvent, useState } from "react"
import { ButtonNameType } from "./App"
import { Button } from "./Components/Button"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    // filter: ButtonNameType
}

export const Todolist = (props: TodolistPropsType) => {
    const [error, setError] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    let [filteredTasks, setFilteredTasks] = useState<ButtonNameType>('All')

    const filterTasks = (value: ButtonNameType) => {
        setFilteredTasks(value)
    }
    const filteredTasks1 = () => {
        switch (filteredTasks) {
            case 'Active':
                return props.tasks.filter(t => !t.isDone)
            case 'Completed':
                return props.tasks.filter(t => t.isDone)
            default: return props.tasks
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.currentTarget.value.trimStart() || (e.currentTarget.value === '')) {
            setNewTitle(e.currentTarget.value.trimStart())
        } else {
            setError(true)
        }
    }
    const onClickButtonHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickButtonHandler()
        }
    }

    const taskList: JSX.Element = props.tasks.length

        ? <ul>
            {
                filteredTasks1().map((t: TasksType) => {
                    const removeTaskHandler = () => props.removeTask(t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    const taskClass = t.isDone ? 'task-isDone' : 'task'
                    return (
                        <li key={t.id} className={taskClass}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeTaskStatusHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your tasks list is empty</span>

    // const userMessageStartTyping: boolean | JSX.Element =
    //     newTitle.length > 15 && <p style={{ color: 'red' }}>Your title is too long!</p>
    // const isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length === 0

    const userEmptyError = error && <p style={{ color: 'red' }}>Enter task title!</p>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'input-error' : undefined}
                    value={newTitle}
                    onKeyPress={handleKeyPress}
                    onChange={onChangeInputHandler}
                    placeholder="Please, start typing"
                />
                <Button
                    name={'+'}
                    callBack={onClickButtonHandler}
                // {...userMessageStartTyping}
                />
                {userEmptyError}
            </div>
            {taskList}
            <div>
                <Button name={'All'} callBack={() => filterTasks('All')} />
                <Button name={'Active'} callBack={() => filterTasks('Active')} />
                <Button name={'Completed'} callBack={() => filterTasks('Completed')} />
            </div>
        </div>
    )
}