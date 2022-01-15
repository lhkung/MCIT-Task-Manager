import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const TasksListPage = () => {

    let [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])


    let getTasks = async () => {

        let response = await fetch('/api/tasks/')
        let data = await response.json()
        setTasks(data)
    }

    return (
        <div className="tasks-list-all">

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782;To do</h2>
                    <p className="tasks-count">{tasks.length}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "To-do") {
                            return (
                                <div className='task-todo'>
                                    <ListItem key={index} task={task} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782; Ongoing</h2>
                    <p className="tasks-count">{tasks.length}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "Ongoing") {
                            return (
                                <div className='task-ongoing'>
                                    <ListItem key={index} task={task} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782; Completed</h2>
                    <p className="tasks-count">{tasks.length}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "Completed") {
                            return (
                                <div className='task-completed'>
                                    <ListItem key={index} task={task} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782; Reviewed</h2>
                    <p className="tasks-count">{tasks.length}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "Reviewed") {
                            return (
                                <div className='task-reviewed'>
                                    <ListItem key={index} task={task} />
                                </div>
                            )
                        }
                    })}
                </div>
                <AddButton />
            </div>



        </div>
    )
}

export default TasksListPage
