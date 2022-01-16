import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const TasksListPage = () => {

    let [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    const TasksLength = (tasks, category) => {
        let count = 0;
        tasks.map((task, index) => {
            if (task.category === category) {
                count++;
            }
        })
        return count;
    }

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
                    <p className="tasks-count">{TasksLength(tasks, "1")}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "1") {
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
                    <p className="tasks-count">{TasksLength(tasks, "2")}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "2") {
                            return (
                                <div>
                                    <div className='task-ongoing'>
                                        <ListItem key={index} task={task} />
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782; Completed</h2>
                    <p className="tasks-count">{TasksLength(tasks, "3")}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "3") {
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
                    <p className="tasks-count">{TasksLength(tasks, "4")}</p>
                </div>
                <div className="tasks-list">
                    {tasks.map((task, index) => {
                        if (task.category === "4") {
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
