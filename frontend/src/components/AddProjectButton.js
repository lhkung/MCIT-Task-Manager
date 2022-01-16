import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddProjectButton = () => {
    return (
        <Link to="/new" className="floating-button">
            <AddIcon />
        </Link>
    )
}

export default AddProjectButton
