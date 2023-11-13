import React from "react"
import { ChangeEvent, useState } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Components/Button"

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
}

export const Todolist: React.FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const [error, setError] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    // let [filteredTasks, setFilteredTasks] = useState<FilterValuesType>('All')

    // const filterTasks = (nextFilter: FilterValuesType) => {
    //     changeTodolistFilter(nextFilter, props.todoListId)
    // }
    // const filteredTasks1 = () => {
    //     switch (filteredTasks) {
    //         case 'Active':
    //             return props.tasks.filter(t => !t.isDone)
    //         case 'Completed':
    //             return props.tasks.filter(t => t.isDone)
    //         default: return props.tasks
    //     }
    // }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.currentTarget.value.trimStart() || (e.currentTarget.value === '')) {
            setNewTitle(e.currentTarget.value.trimStart())
        } else {
            setError(true)
        }
    }
    const onClickButtonHandler = () => {
        props.addTask(newTitle, props.todoListId)
        setNewTitle('')
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickButtonHandler()
        }
    }
    const onClickRemoveTodolistHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const taskList: JSX.Element = props.tasks.length
        ? <ul>
            {
                props.tasks.map((t: TasksType) => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
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

    const userEmptyError = error && <p style={{ color: 'red' }}>Enter task title!</p>

    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickRemoveTodolistHandler}>x</button>
            </h3>
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
                <Button name={'All'} callBack={() => props.changeTodolistFilter('All', props.todoListId)} />
                <Button name={'Active'} callBack={() => props.changeTodolistFilter('Active', props.todoListId)} />
                <Button name={'Completed'} callBack={() => props.changeTodolistFilter('Completed', props.todoListId)} />
            </div>
        </div>
    )
}