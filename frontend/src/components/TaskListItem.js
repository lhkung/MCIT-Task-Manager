import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg'
import { useHistory } from "react-router-dom";

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
    if (title.length > 100) {
        return title.slice(0, 100) + "..."
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

let handleLeft = (task, useHist, projectId) => {
    let category = parseInt(task.category, 10)
    if (category > 1) {
        task.category = (category - 1) + ""
        updateTask(task);
        useHist.push(`/${projectId}/tasks`)
    }

}

let handleRight = (task, useHist, projectId) => {
    let category = parseInt(task.category, 10)
    if (category < 4) {
        task.category = (category + 1) + ""
        updateTask(task);
        useHist.push(`/${projectId}/tasks`)
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

const TaskListItem = ({ task, match }) => {
    const useHist = useHistory();
    let projectId = parseInt((match.url).match(/\d+/)[0])
    return (
        <div>
            <div>
                <div className="tasks-list-item" >
                    <Link to={`tasks/${task.id}`}>
                        <h1>{getTitle(task)}</h1>

                        <h3>{getBody(task)}</h3>
                        <p><span>{getPriority(task)}</span>{getTime(task)}</p>
                    </Link>

                </div>
                <div className="tasks-arrows">
                    <ArrowLeft cursor="pointer" onClick={() => handleLeft(task, useHist, projectId)} />
                    <ArrowRight cursor="pointer" onClick={() => handleRight(task, useHist, projectId)} />
                </div>



            </div>

        </div>
    )



}

export default TaskListItem
