//import React from 'react' 
//need to import only when using class based components
import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from 'react-router-dom'

const Header = ({ title, onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className='header' >
            <h1>{title}</h1>
            {location.pathname === '/' &&  <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onAdd={onAdd}></Button>}
        </header>
    )
}

Header.defaultProps = {
    title : 'Task Manager'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
/* //Inline Styling 
const headingStyle = {
    color: 'red', backgroundColor: 'black'
} */
export default Header
