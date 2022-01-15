import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const TaskPage = ({ match, history }) => {

    let taskId = match.params.id
    let [task, setTask] = useState({ title: '', body: '', category: 'To-do', priority: 'Urgent' })


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
        history.push('/')
    }

    let handleSubmit = () => {
        console.log('NOTE:', task)
        if (taskId !== 'new' && task.body == '' && task.title == '') {
            deleteTask()
        } else if (taskId !== 'new') {
            updateTask()
        } else if (taskId === 'new' && task.body == '' && task.title == '') {
            createTask()
        }
        history.push('/')
    }

    let handleChange = (input, inputType) => {
        if (inputType == "body") {
            setTask(task => ({ ...task, 'body': input }))
        } else if (inputType == "title") {
            setTask(task => ({ ...task, 'title': input }))
        } else if (inputType == "category") {
            setTask(task => ({ ...task, 'category': input }))
        } else if (inputType == "priority") {
            setTask(task => ({ ...task, 'priority': input }))
        }
        console.log('Handle Change:', task)
    }

    return (
        <div className="task" >
            <div className="task-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {taskId !== 'new' ? (
                    <button onClick={deleteTask}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <div className="task-detail">
                <h1>Title</h1>
                <textarea className='task-textarea-title' onChange={(e) => { handleChange(e.target.value, "title") }} value={task?.title}></textarea>
            </div>

            <div className="task-detail">
                <h1>Content</h1>
                <textarea onChange={(e) => { handleChange(e.target.value, "body") }} value={task?.body}></textarea>
            </div>

            <div className="task-detail">
                <h1>Category</h1>
                <select className="task-droplist" onChange={(e) => { handleChange(e.target.value, "category") }} value={task?.category}>
                    <option value="To-do">To do</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Reviewed">Reviewed</option>
                </select>
            </div>

            <div className="task-detail">
                <h1>Priority</h1>
                <select className="task-droplist" onChange={(e) => { handleChange(e.target.value, "priority") }} value={task?.priority}>
                    <option value="Urgent">Urgent</option>
                    <option value="Semi-urgent">Semi-urgent</option>
                    <option value="Non-urgent">Non-urgent</option>
                    <option value="Stretch Goal">Stretch Goal</option>
                </select>
            </div>

            <div className="task-detail">
                <h1>Ownership</h1>
            </div>
            <div className="task-detail">
                <h1>Deadline</h1>
            </div>
        </div>

    )
}

export default TaskPage
