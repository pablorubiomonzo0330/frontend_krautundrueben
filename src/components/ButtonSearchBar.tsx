interface ButtonSearchBarProps{
    contentOfButton: string,
    onClick: () => void
}

function ButtonSearchBar({contentOfButton, onClick}:  ButtonSearchBarProps){
    return <>
        <button onClick={onClick}>{contentOfButton}</button>
    </>
}

export default ButtonSearchBar