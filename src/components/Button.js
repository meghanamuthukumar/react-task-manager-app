
const Button = ({ color, text, onAdd }) => {
    /* const onClick = () => {
        console.log('button was clicked!')
    } */

    return (
        <div>
            <button style = {{backgroundColor: color}} className='btn' onClick={onAdd}>{text}</button>
        </div>
    )
}

export default Button
