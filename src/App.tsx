import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    todoListTitle: string
    filter: FilterValuesType
    todoListId: string
}
export type TaskStateType = {
    [todoListId: string]: Array<TasksType>
}

function App(): JSX.Element {

    const todoListId_1 = crypto.randomUUID()
    const todoListId_2 = crypto.randomUUID()

    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        { todoListId: todoListId_1, todoListTitle: 'What to learn', filter: 'All' },
        { todoListId: todoListId_2, todoListTitle: 'What to buy', filter: 'All' },
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Vue', isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Coffee', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Vue', isDone: false },
        ],
    })

    const addTask = (taskTitle: string, todoListId: string) => {
        const newTasks = { id: v1(), title: taskTitle, isDone: false }
        setTasks({ ...tasks, [todoListId]: [...tasks[todoListId], newTasks] })
        // const nexttTasks: Array<TasksType> = [...tasks[todoListId], newTasks]
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todoListId] = nexttTasks
        // setTasks(copyTasks)
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t)
        })
        // const taskForUpdate = tasks[todoListId]
        // const updatedTask = taskForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t )
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todoListId] = updatedTask
        // setTasks(copyTasks)
    }
    const removeTask = (id: string, todoListId: string) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id) })
        // const tasksForRemove: Array<TasksType> = tasks[todoListId]
        // const filteredTasks = tasksForRemove.filter(t => t.id !== id)
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todoListId] = filteredTasks
        // setTasks(copyTasks)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        // const updateTasks = tasks[todoListId].map(task => task.id === taskId ? {
        //     ...task,
        //     title: newTitle
        // } : task)
        // tasks[todoListId] = updateTasks
        // setTasks({ ...tasks })
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? { ...t, title: newTitle } : t)
        })
    }


    const addTodolist = (newTitle: string) => {
        const newTodoId = v1()
        const newTodo: TodolistType = { todoListId: newTodoId, todoListTitle: newTitle, filter: 'All' }
        setTodoList([...todoList, newTodo])
        setTasks({ ...tasks, [newTodoId]: [] })
    }
    const changeTodolistTitle = (newTodolistTitle: string, todoListId: string) => {
        setTodoList(todoList.map(tl => tl.todoListId === todoListId ? { ...tl, todoListTitle: newTodolistTitle } : tl))
    }
    const changeTodolistFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoList(todoList.map(tl => tl.todoListId === todoListId ? { ...tl, filter: nextFilter } : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(tl => tl.todoListId !== todoListId))
        delete tasks[todoListId]
    }


    const getTasksForRender = (allTasks: Array<TasksType>, nextFilter: FilterValuesType) => {
        switch (nextFilter) {
            case 'Active':
                return allTasks.filter(t => !t.isDone)
            case 'Completed':
                return allTasks.filter(t => t.isDone)
            default: return allTasks
        }
    }

    const todoListsComponents: Array<JSX.Element> = todoList.map(tl => {
        const tasksForRender = getTasksForRender(tasks[tl.todoListId], tl.filter)

        return (
            <Todolist
                key={tl.todoListId}
                todoListId={tl.todoListId}
                filter={tl.filter}
                title={tl.todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todoListsComponents}
        </div>
    );
}
export default App;
