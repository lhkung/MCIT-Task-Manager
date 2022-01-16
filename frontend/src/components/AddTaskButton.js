import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddTaskButton = () => {
    return (
        <Link to="tasks/new" className="floating-button">
            <AddIcon />
        </Link>
    )
}

export default AddTaskButton
