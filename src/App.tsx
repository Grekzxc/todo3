import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type ButtonNameType = 'All' | 'Active' | 'Completed'


function App() {

    const titleName = 'What to learn'

    let [tasks, setTasks] = useState([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Vue', isDone: false },
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist
                title={titleName}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
