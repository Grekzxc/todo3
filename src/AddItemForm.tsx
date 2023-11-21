import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';


type AddItemFormType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [error, setError] = useState(false)
    const [newTitle, setNewTitle] = useState('')


    const onClickButtonHandler = () => {
        props.addItem(newTitle)
        setNewTitle('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.currentTarget.value.trimStart() || (e.currentTarget.value === '')) {
            setNewTitle(e.currentTarget.value.trimStart())
        } else {
            setError(true)
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickButtonHandler()
        }
    }
    const userEmptyError = error && <p style={{ color: 'red' }}>Enter task title!</p>

    return (
        <>
            <TextField
                size="small"
                sx={{ mr: 0 }}
                value={newTitle}
                className={error ? 'input-error' : undefined}
                onKeyPress={handleKeyPress}
                onChange={onChangeInputHandler}
                placeholder="Please, start typing"
            />
            <IconButton
                size="small"
                onClick={onClickButtonHandler}>
                <AddBoxIcon />
            </IconButton>
            {userEmptyError}
        </>
    )
}