import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

let getTime = (project) => {
    return new Date(project.updated).toLocaleDateString()
}

let getTitle = (project) => {

    let title = project.project.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

let getDescription = (project) => {

    let title = project.description.split('\n')[0]
    if (title.length > 170) {
        return title.slice(0, 170) + "..."
    }
    return title
}

const ProjectListItem = ({ project }) => {
    return (
        <div className="project-list-item" >
            <Link to={`/${project.id}/tasks`}>
                <h1>{getTitle(project)}</h1>
                <h3>{getDescription(project)}</h3>
                <p>{getTime(project)}</p>
            </Link>
            <Link to={`${project.id}/`}>
                <button class="project-edit-button">EDIT Project Details</button>
            </Link>
        </div>
    )
}

export default ProjectListItem
