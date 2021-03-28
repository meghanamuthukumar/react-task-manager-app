import { useState } from 'react'



export const AddTask = ({onAdd}) => {
    const [title, setTitle] = useState('') 
    const [time, setTime] = useState('') 
    const [reminder, setReminder] = useState(false) 
    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert('Please add a task')
            return
        }
        onAdd({title, time, reminder})
        setTitle('')
        setTime('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>When?</label>
                <input type='text' placeholder='Add Date and Time' value={time} onChange={(e) => setTime(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input className='btn btn-block' type='submit' value='Add Task'/>
        </form>
    )
}