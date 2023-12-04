import { v1 } from "uuid"
import { FilterValuesType, TaskStateType } from "../App"
import { AddTodolistAT, RemoveTodolistAT } from "./todolists_reducer"

// 1.Исходный стэйт
// 2.Обьект для выполнения действия со стейтом
// 2.1.Kакой тип действия хотим выполнить
// 2.2.Dанные, необходимые для выполнения необходимого действия

export type RemoveTasksAT = {
    type: 'REMOVE_TASKS'
    id: string
    todolistId: string
}
export type AddTasksAT = {
    type: 'ADD_TASKS'
    taskTitle: string
    todolistId: string
}
export type ChangeTasksTitleTypeAT = {
    type: 'CHANGE_TASKS_TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}
export type ChangeTaskStatusTypeAT = {
    type: 'CHANGE_TASKS_STATUS'
    taskId: string
    newIsDoneValue: boolean
    todolistId: string
}
export type ActionType =
    RemoveTasksAT |
    AddTasksAT |
    ChangeTasksTitleTypeAT |
    ChangeTaskStatusTypeAT |
    AddTodolistAT |
    RemoveTodolistAT
// export type ActionType2 =
//     RemoveTaskActionType |
//     AddTasksActionType |
//     ChangeTasksTitleActionType |
//     ChangeTasksStatusActionType |
//     AddTodolistAT

// export type RemoveTaskActionType = ReturnType<typeof RemoveTasksAC>
// export type AddTasksActionType = ReturnType<typeof AddTasksAC>
// export type ChangeTasksTitleActionType = ReturnType<typeof ChangeTasksTitleAC>
// export type ChangeTasksStatusActionType = ReturnType<typeof ChangeTasksStatusAC>

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASKS':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id) }
        case 'ADD_TASKS':
            const newTasks = { id: v1(), title: action.taskTitle, isDone: false }
            return { ...state, [action.todolistId]: [...state[action.todolistId], newTasks] }
        case 'CHANGE_TASKS_TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, title: action.newTitle } : t)
            }
        case 'CHANGE_TASKS_STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, isDone: action.newIsDoneValue } : t)
            }
        case 'ADD_TODOLIST':
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE_TODOLIST":
            const copyState = { ...state }
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

export const RemoveTasksAC = (id: string, todolistId: string) => ({
    type: "REMOVE_TASKS", id, todolistId
} as const)
export const AddTasksAC = (taskTitle: string, todolistId: string) => ({
    type: "ADD_TASKS", taskTitle, todolistId
} as const)
export const ChangeTasksTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE_TASKS_TITLE', taskId, newTitle, todolistId
} as const)
export const ChangeTasksStatusAC = (taskId: string, newIsDoneValue: boolean, todolistId: string) => ({
    type: 'CHANGE_TASKS_STATUS', taskId, newIsDoneValue, todolistId
} as const)