import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"
import { AddTodolistAC, ChangeTodolistFilterTypeAC, ChangeTodolistTitleTypeAC, RemoveTodolistAC, todolistsReducer } from "./todolists_reducer"


test('should be removed correct todolist', () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const startState: Array<TodolistType> = [
        { todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'All' },
        { todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId_1))


    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId_2)
})
test('should be added correct todolist', () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        { todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'All' },
        { todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle, v1()))

    expect(endState.length).toBe(3)
    expect(endState[2].todolistTitle).toBe(newTodolistTitle)

})
test('should change name of correct todolist', () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        { todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'All' },
        { todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'All' },
    ]


    const endState = todolistsReducer(startState, ChangeTodolistTitleTypeAC(newTodolistTitle, todolistId_2))

    expect(endState[0].todolistTitle).toBe('What to learn')
    expect(endState[1].todolistTitle).toBe(newTodolistTitle)
})
test('should change filter of correct todolist', () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    let newFilter: FilterValuesType = 'Completed'
    const startState: Array<TodolistType> = [
        { todolistId: todolistId_1, todolistTitle: 'What to learn', filter: 'All' },
        { todolistId: todolistId_2, todolistTitle: 'What to buy', filter: 'All' },
    ]
    const endState = todolistsReducer(startState, ChangeTodolistFilterTypeAC(newFilter, todolistId_2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})
