import React from "react"
import { ChangeEvent } from "react"
import { FilterValuesType, TodolistType } from "./App"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EDitableSpan"
import Button from "@mui/material/Button"
import { Checkbox, IconButton, List, ListItem, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { AppRootStateType } from "./Redusers/store";
import { useDispatch } from "react-redux";
import { AddTasksAC, ChangeTasksStatusAC, ChangeTasksTitleAC, RemoveTasksAC } from "./Redusers/tasks_reducer";
import { ChangeTodolistFilterTypeAC, ChangeTodolistTitleTypeAC, RemoveTodolistAC } from "./Redusers/todolists_reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todolist: TodolistType
    // filter: TasksType[]
}

export const TodolistWithRedux: React.FC<TodolistPropsType> = ({ todolist }: TodolistPropsType) => {

    const { todolistId, todolistTitle, filter } = todolist
    let tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const addTaskTitle = (newTitle: string) => dispatch(AddTasksAC(newTitle, todolistId))
    const onClickRemoveTodolistHandler = () => dispatch(RemoveTodolistAC(todolistId))
    const changeFilterHandlerCreator = (FilterValue: FilterValuesType) =>
        () => dispatch(ChangeTodolistFilterTypeAC(FilterValue, todolistId))


    const tasksList: Array<JSX.Element> = tasks.map((t: TasksType) => {

        const removeTaskHandler = () => dispatch(RemoveTasksAC(t.id, todolistId))
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(ChangeTasksStatusAC(t.id, e.currentTarget.checked, todolistId))
        }
        const changeTaskTitle = (newTodolistTitle: string) => {
            dispatch(ChangeTasksTitleAC(t.id, newTodolistTitle, todolistId))
        }
        const taskClass = t.isDone ? 'task-isDone' : 'task'



        return (
            <ListItem
                divider
                disablePadding
                sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}
                key={t.id} className={taskClass}>
                <Checkbox
                    size="small"
                    checked={t.isDone}
                    onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                <IconButton
                    size={"small"}
                    onClick={removeTaskHandler}>
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </ListItem>
        )
    })

    const taskList: JSX.Element = tasks.length
        ? <List>{tasksList}</List> : <span>Your tasks list is empty</span>

    const changeTodoTitle = (newTodolistTitle: string) => {
        dispatch(ChangeTodolistTitleTypeAC(newTodolistTitle, todolistId))
    }

    // const getTasksForRender = (allTasks: Array<TasksType>, nextFilter: FilterValuesType) => {
    //     switch (nextFilter) {
    //         case 'Active':
    //             return allTasks.filter(t => !t.isDone)
    //         case 'Completed':
    //             return allTasks.filter(t => t.isDone)
    //         default: return allTasks
    //     }
    // }

    // if (filter === 'Active') {
    //     tasks = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === 'Completed') {
    //     tasks = tasks.filter(t => t.isDone === true)
    // }

    return (
        <div style={{ color: "currentcolor" }}>
            <Typography
                variant="h5"
                align="center" >
                <EditableSpan title={todolistTitle} changeTitle={changeTodoTitle} />
                <IconButton
                    size="small"
                    onClick={onClickRemoveTodolistHandler}>
                    <DeleteForeverIcon />
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskTitle} />
            {taskList}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <Button
                    sx={{ mr: '2px', padding: '3px 4px', flexGrow: 1 }}
                    variant={"contained"}
                    size='small'
                    color={filter === 'All' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("All")}>All</Button>
                <Button
                    sx={{ mr: '2px', padding: '3px 4px', flexGrow: 1 }}
                    variant={"contained"}
                    size='small'
                    color={filter === 'Active' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("Active")}>Active</Button>
                <Button
                    sx={{ mr: '2px', margin: '0', padding: '3px 4px', flexGrow: 1 }}
                    variant={"contained"}
                    size={'small'}
                    color={filter === 'Completed' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("Completed")}>Completed</Button>
            </div>
        </div>
    )
}