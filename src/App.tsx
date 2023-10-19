import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {

    const titleName = 'What to learn'
    const titleName2 = 'What to buy'

    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Vue', isDone: false },
    ]
    const tasks2 = [
        { id: 1, title: 'Hello work', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
    ]

    return (
        <div className="App">
            <Todolist title={titleName} tasks={tasks1} />
            <Todolist title={titleName2} tasks={tasks2} />
        </div>
    );
}

export default App;
