import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Box, Button, Container, CssBaseline, Grid, IconButton, Paper, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AddTodolistAC, ChangeTodolistFilterTypeAC, ChangeTodolistTitleTypeAC, RemoveTodolistAC } from './Redusers/todolists_reducer';
import { AddTasksAC, ChangeTasksStatusAC, ChangeTasksTitleAC, RemoveTasksAC } from './Redusers/tasks_reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './Redusers/store';
import { useDispatch } from 'react-redux';
import { TodolistWithRedux } from './TodolistWithRedux';

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

function AppWithRedux(): JSX.Element {

    const [isDarkMode, setisDarkMode] = useState<boolean>(true)

    let todoList = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const addTask = (taskTitle: string, todolistId: string) => {
        dispatch(AddTasksAC(taskTitle, todolistId))
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(ChangeTasksStatusAC(taskId, newIsDoneValue, todolistId))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatch(RemoveTasksAC(id, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTasksTitleAC(taskId, newTitle, todolistId))
    }

    const addTodolist = (newTitle: string) => {
        dispatch(AddTodolistAC(newTitle))
    }
    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleTypeAC(newTodolistTitle, todolistId))
    }
    const changeTodolistFilter = (nextFilter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterTypeAC(nextFilter, todolistId))
    }
    const removeTodoList = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
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
        // const tasksForRender = getTasksForRender(tasks[tl.todolistId], tl.filter)
        return (
            <Grid item key={tl.todolistId}>
                <Paper
                    elevation={10}
                    sx={{ p: '15px' }}>
                    <TodolistWithRedux
                        todolist={tl}
                    // filter={tasksForRender}

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
export default AppWithRedux;
