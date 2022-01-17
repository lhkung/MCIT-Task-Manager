import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useHistory } from "react-router-dom";

const TaskPage = ({ match, history }) => {
    const useHist = useHistory();
    let projectId = parseInt((match.url).match(/\d+/)[0])

    let taskId = match.params.id
    let [task, setTask] = useState({ project_id: projectId, category: '1', priority: '1' })

    useEffect(() => {
        getTask()
    }, [taskId])


    let getTask = async () => {
        if (taskId === 'new') return

        let response = await fetch(`/api/tasks/${taskId}/`)
        let data = await response.json()
        setTask(data)
    }

    let createTask = async () => {
        fetch(`/api/tasks/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }


    let updateTask = async () => {
        fetch(`/api/tasks/${taskId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }


    let deleteTask = async () => {
        fetch(`/api/tasks/${taskId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        useHist.goBack()
    }

    let handleSubmit = () => {
        console.log('NOTE:', task)
        if (taskId !== 'new' && (task.body === '' || task.title === '')) {
            deleteTask()
        } else if (taskId !== 'new') {
            updateTask()
        } else if (taskId === 'new' && task.title !== '') {
            createTask()
        }
        useHist.goBack()
    }

    let handleChange = (input, inputType) => {
        if (inputType === "body") {
            setTask(task => ({ ...task, 'body': input }))
        } else if (inputType === "title") {
            setTask(task => ({ ...task, 'title': input }))
        } else if (inputType === "category") {
            setTask(task => ({ ...task, 'category': input }))
        } else if (inputType === "priority") {
            setTask(task => ({ ...task, 'priority': input }))
        }
    }

    return (
        <div className="task" >
            <div className="task-header">

                <h3>
                    <ArrowLeft onClick={() => useHist.push(`/${projectId}/tasks`)} />
                </h3>
                <button className="app-header-button" onClick={handleSubmit}>Save Changes</button>

                {taskId === 'new' ? (
                    ""
                ) : (
                    <button className="app-header-button" onClick={deleteTask}>Delete</button>
                )}

            </div>
            <div className="task-detail">
                <h5>Task</h5>
                <textarea className='task-textarea-title' onChange={(e) => { handleChange(e.target.value, "title") }} value={task?.title}></textarea>
            </div>

            <div className="task-detail">
                <h5>Description</h5>
                <textarea onChange={(e) => { handleChange(e.target.value, "body") }} value={task?.body}></textarea>
            </div>

            <div className="task-detail">
                <h5>Category</h5>
                <select className="task-droplist" onChange={(e) => { handleChange(e.target.value, "category") }} value={task?.category}>
                    <option value="1">To do</option>
                    <option value="2">Ongoing</option>
                    <option value="3">Completed</option>
                    <option value="4">Reviewed</option>
                </select>
            </div>

            <div className="task-detail">
                <h5>Priority</h5>
                <select className="task-droplist" onChange={(e) => { handleChange(e.target.value, "priority") }} value={task?.priority}>
                    <option value="1">Urgent</option>
                    <option value="2">Semi-urgent</option>
                    <option value="3">Non-urgent</option>
                    <option value="4">Stretch Goal</option>
                </select>
            </div>
        </div>

    )
}

export default TaskPage
