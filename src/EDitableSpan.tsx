import React, { ChangeEvent, FC, useState } from "react";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setNewTitle] = useState(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ?
            <input
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeInputHandler}
            /> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}