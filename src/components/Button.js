
const Button = ({ color, text }) => {
    /* const onClick = () => {
        console.log('button was clicked!')
    } */

    return (
        <div>
            <button style = {{backgroundColor: color}} className='btn'>{text}</button>
        </div>
    )
}

export default Button
