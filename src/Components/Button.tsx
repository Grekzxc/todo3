
type PropsType = {
    name: string
    callBack: () => void
    // filteredTasks?: ButtonNameType
}

export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button
            onClick={onClickHandler}>{props.name}</button>
    )
}
