import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type ButtonNameType = 'All' | 'Active' | 'Completed'


function App() {

    const titleName = 'What to learn'

    let [tasks, setTasks] = useState<Array<TasksType>>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Vue', isDone: false },
    ])

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (newTitle: string) => {
        const newTasks = { id: v1(), title: newTitle, isDone: false }
        setTasks([newTasks, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: Array<TasksType> = tasks.map((task: TasksType) =>
            task.id === taskId ? { ...task, isDone: newIsDoneValue } : task)
        setTasks(nextState)
    }

    return (
        <div className="App">
            <Todolist
                title={titleName}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            // filter={filter}
            />
        </div>
    );
}

export default App;
