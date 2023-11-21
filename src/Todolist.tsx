import React from "react"
import { ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EDitableSpan"
import Button from "@mui/material/Button"
import { Checkbox, IconButton, List, ListItem, Typography } from "@mui/material"

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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todoListId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const addTaskTitle = (newTitle: string) => props.addTask(newTitle, props.todoListId)
    const onClickRemoveTodolistHandler = () => props.removeTodoList(props.todoListId)

    const changeFilterHandlerCreator = (FilterValue: FilterValuesType) =>
        () => props.changeTodolistFilter(FilterValue, props.todoListId)

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TasksType) => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todoListId)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        const taskClass = t.isDone ? 'task-isDone' : 'task'

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todoListId, t.id, title)
        }

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

    const taskList: JSX.Element = props.tasks.length
        ? <List>{tasksList}</List> : <span>Your tasks list is empty</span>

    const changeTodoTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todoListId, newTitle)
    }

    return (
        <div style={{ color: "currentcolor" }}>
            <Typography
                variant="h5"
                align="center" >
                <EditableSpan title={props.title} changeTitle={changeTodoTitle} />
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
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("All")}>All</Button>
                <Button
                    sx={{ mr: '2px', padding: '3px 4px', flexGrow: 1 }}
                    variant={"contained"}
                    size='small'
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("Active")}>Active</Button>
                <Button
                    sx={{ mr: '2px', margin: '0', padding: '3px 4px', flexGrow: 1 }}
                    variant={"contained"}
                    size={'small'}
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("Completed")}>Completed</Button>
            </div>
        </div>
    )
}