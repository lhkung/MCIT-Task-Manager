import React from 'react'
import { Link } from 'react-router-dom'

let getTime = (task) => {
    return new Date(task.updated).toLocaleDateString()
}


let getTitle = (task) => {

    let title = task.title.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

let getBody = (task) => {

    let title = task.body.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

let getPriority = (task) => {

    if (task.priority === "1") {
        return "Urgent"
    }
    else if (task.priority === "2") {
        return "Semi-urgent"
    }
    else if (task.priority === "3") {
        return "Non-urgent"
    }
    else if (task.priority === "4") {
        return "Stretch Goals"
    }
}

let getContent = (task) => {
    let title = getTitle(task)
    let content = task.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}


const ListItem = ({ task }) => {
    return (
        <Link to={`/task/${task.id}`}>
            <div className="tasks-list-item" >
                <h3>{getTitle(task)}</h3>
                <h3>{getBody(task)}</h3>
                <h3>{getPriority(task)}</h3>
                <p><span>{getTime(task)}</span>{getContent(task)}</p>
            </div>

        </Link>


    )



}

export default ListItem
