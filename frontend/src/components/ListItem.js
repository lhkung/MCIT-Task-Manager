import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg'

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

let handleLeft = (task) => {
    let category = parseInt(task.category, 10)
    if (category > 1) {
        task.category = (category - 1) + ""
        updateTask(task);
        window.location.reload(false);
    }

}

let handleRight = (task) => {
    let category = parseInt(task.category, 10)
    if (category < 4) {
        task.category = (category + 1) + ""
        updateTask(task);
        window.location.reload(false);
    }

}

let updateTask = async (task) => {
    fetch(`/api/tasks/${task.id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

const ListItem = ({ task }) => {
    return (
        <div>
            <div>
                <div className="tasks-list-item" >
                    <Link to={`/task/${task.id}`}>
                        <h1>{getTitle(task)}</h1>

                        <h3>{getContent(task)}</h3>
                        <p><span>{getPriority(task)}</span>{getTime(task)}</p>
                    </Link>

                </div>
                <div className="tasks-arrows">
                    <ArrowLeft cursor="pointer" onClick={() => handleLeft(task)} />
                    <ArrowRight cursor="pointer" onClick={() => handleRight(task)} />
                </div>



            </div>

        </div>
    )



}

export default ListItem
