import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"

// 1.Исходный стэйт
// 2.Обьект для выполнения действия со стейтом
// 2.1.Kакой тип действия хотим выполнить
// 2.2.Dанные, необходимые для выполнения необходимого действия

export type RemoveTodolistAT = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD_TODOLIST'
    newTitle: string
    todolistId: string
}
export type ChangeTodolistTitleTypeAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    newTodolistTitle: string
    todolistId: string
}
export type ChangeTodolistFilterTypeAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    nextFilter: FilterValuesType
    todolistId: string
}

export type ActionType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistTitleTypeAT |
    ChangeTodolistFilterTypeAT

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.todolistId !== action.todolistId)
        case 'ADD_TODOLIST':
            // const newTodo: TodolistType = { todolistId: action.todolistId, todolistTitle: action.newTitle, filter: 'All' }
            return [...state, { todolistId: action.todolistId, todolistTitle: action.newTitle, filter: 'All' }]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.todolistId === action.todolistId ?
                { ...tl, todolistTitle: action.newTodolistTitle } : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.todolistId === action.todolistId ? { ...tl, filter: action.nextFilter } : tl)
        default:
            throw new Error('I don`t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: "REMOVE_TODOLIST", todolistId
})
export const AddTodolistAC = (newTitle: string): AddTodolistAT => ({
    type: "ADD_TODOLIST", newTitle, todolistId: v1()
})
export const ChangeTodolistTitleTypeAC = (newTodolistTitle: string, todolistId: string): ChangeTodolistTitleTypeAT => ({
    type: 'CHANGE_TODOLIST_TITLE', newTodolistTitle, todolistId
})
export const ChangeTodolistFilterTypeAC = (nextFilter: FilterValuesType, todolistId: string): ChangeTodolistFilterTypeAT => ({
    type: 'CHANGE_TODOLIST_FILTER', nextFilter, todolistId
})