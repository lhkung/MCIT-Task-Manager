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
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

let getContent = (project) => {
    let title = getTitle(project)
    let content = project.description.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}

let handleEdit = (project) => {

}

const ProjectListItem = ({ project }) => {
    return (
        <div>
            <div>
                <div className="tasks-list-item" >
                    <Link to={`/${project.id}/tasks`}>
                        <h1>{getTitle(project)}</h1>
                        <h3>{getDescription(project)}</h3>
                        <p>{getTime(project)}</p>
                    </Link>
                    <Link to={`${project.id}/`}>Make edit</Link>

                </div>
            </div>

        </div >
    )
}

export default ProjectListItem
