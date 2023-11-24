import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Box, Button, Container, CssBaseline, Grid, IconButton, Paper, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    [x: string]: any;
    todolistTitle: string
    filter: FilterValuesType
    todolistId: string
}
export type TaskStateType = {
    [todolistId: string]: Array<TasksType>
}

function App(): JSX.Element {

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [isDarkMode, setisDarkMode] = useState<boolean>(true)

    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        { todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'All' },
        { todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'All' },
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Vue', isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Coffee', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
            { id: v1(), title: 'Vue', isDone: false },
        ],
    })

    const addTask = (taskTitle: string, todolistId: string) => {
        const newTasks = { id: v1(), title: taskTitle, isDone: false }
        setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTasks] })
        // const nexttTasks: Array<TasksType> = [...tasks[todolistId], newTasks]
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todolistId] = nexttTasks
        // setTasks(copyTasks)
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t)
        })
        // const taskForUpdate = tasks[todolistId]
        // const updatedTask = taskForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t )
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todolistId] = updatedTask
        // setTasks(copyTasks)
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
        // const tasksForRemove: Array<TasksType> = tasks[todolistId]
        // const filteredTasks = tasksForRemove.filter(t => t.id !== id)
        // const copyTasks: TaskStateType = { ...tasks }
        // copyTasks[todolistId] = filteredTasks
        // setTasks(copyTasks)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        // const updateTasks = tasks[todolistId].map(task => task.id === taskId ? {
        //     ...task,
        //     title: newTitle
        // } : task)
        // tasks[todolistId] = updateTasks
        // setTasks({ ...tasks })
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? { ...t, title: newTitle } : t)
        })
    }

    const addTodolist = (newTitle: string) => {
        const newTodoId = v1()
        const newTodo: TodolistType = { todolistId: newTodoId, todolistTitle: newTitle, filter: 'All' }
        setTodoList([...todoList, newTodo])
        setTasks({ ...tasks, [newTodoId]: [] })
    }
    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
        setTodoList(todoList.map(tl => tl.todolistId === todolistId ? { ...tl, todolistTitle: newTodolistTitle } : tl))
    }
    const changeTodolistFilter = (nextFilter: FilterValuesType, todolistId: string) => {
        setTodoList(todoList.map(tl => tl.todolistId === todolistId ? { ...tl, filter: nextFilter } : tl))
    }
    const removeTodoList = (todolistId: string) => {
        setTodoList(todoList.filter(tl => tl.todolistId !== todolistId))
        const copyTasksState = { ...tasks }
        delete copyTasksState[todolistId]
        setTasks(copyTasksState)
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

    const mode = isDarkMode ? 'dark' : 'light'
    const toggleTheme = () => setisDarkMode(!isDarkMode)
    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#212121',
            },
            secondary: {
                main: '#b388ff',
            },
            mode: mode
        }
    })

    const todoListsComponents: Array<JSX.Element> = todoList.map(tl => {
        const tasksForRender = getTasksForRender(tasks[tl.todolistId], tl.filter)

        return (
            <Grid item key={tl.todolistId}>
                <Paper
                    elevation={10}
                    sx={{ p: '15px' }}>
                    <Todolist
                        todolistId={tl.todolistId}
                        filter={tl.filter}
                        title={tl.todolistTitle}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <div className="App">
                <AppBar position='static'>
                    <Toolbar
                        sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color='inherit'>
                            <Menu />
                        </IconButton>
                        <Typography variant='h5'>Todolist</Typography>
                        <Box>
                            <Button
                                color='inherit'
                                variant={'outlined'}
                                onClick={toggleTheme}
                            >
                                {mode}
                            </Button>
                            <Button
                                color='inherit'
                                variant={'outlined'}>
                                LogOut
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Grid
                        sx={{ p: '15px', justifyContent: 'center', alignItems: 'center' }}
                        container >
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}
export default App;
