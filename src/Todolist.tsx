import { useState } from "react"
import { ButtonNameType } from "./App"

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [filteredTasks, setFilteredTasks] = useState<ButtonNameType>('All')

    const filterTasks = (buttonName: ButtonNameType) => {
        setFilteredTasks(buttonName)
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {filteredTasks1().map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} /><span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => filterTasks('All')}>All</button>
                <button onClick={() => filterTasks('Active')}>Active</button>
                <button onClick={() => filterTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}