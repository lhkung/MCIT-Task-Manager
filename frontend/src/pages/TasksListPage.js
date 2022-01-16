import React, { useState, useEffect } from 'react'
import TaskListItem from '../components/TaskListItem'
import AddTaskButton from '../components/AddTaskButton'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'

const TasksListPage = ({ match }) => {
    const useHist = useHistory();
    let projectId = parseInt((match.url).match(/\d+/)[0])
    let [tasks, setTasks] = useState([])
    let [projects, setProjects] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        getProjects()
    }, [])

    const TasksLength = (tasks, category, projectId) => {
        let count = 0;
        tasks.map((task, index) => {
            if (task.category === category && projectId === task.project) {
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

    let getProjects = async () => {

        let response = await fetch('/api/projects/')
        let data = await response.json()
        setProjects(data)
    }

    let projectList = [""]

    let [project, setProject] = useState([])

    let handleChange = (input) => {
        setProject(project => ({ ...project, 'id': input }))
    }

    return (
        <div>
            <button onClick={() => useHist.goBack()}>Go Back</button>
            <select onChange={(e) => window.location = this.value}>
                {/* <option value="https://www.yahoo.com/" selected>Option1</option>
                <option value="https://www.google.co.in/">Option2</option>
                <option value="https://www.gmail.com/">Option3</option> */}
                {projects.map((project, index) => {
                        if (!projectList.includes(project.project)) {
                            projectList.push(project.project)
                            return ( 
                                <option value="../5">{project.project} </option>
                            )
                        }
                    }
                )}
            </select>

            <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);">
                {/* <option value="1">Urgent</option>
                <option value="2">Semi-urgent</option>
                <option value="3">Non-urgent</option>
                <option value="4">Stretch Goal</option> */}
                <option value="">Select...</option>

            </select>
                {/* {projects.map((project, index) => {
                        if (!projectList.includes(project.project)) {
                            projectList.push(project.project)
                            return (
                                <Link to={`../${project.id}/tasks`}>
                                    <button>{project.project} </button>
                                </Link>
                            )
                        }
                    })} */}
            <div className="tasks-list-all">
                <div className="tasks-column">
                    <div className="tasks-header">
                        <h2 className="tasks-title">&#9782;To do</h2>
                        <p className="tasks-count">{TasksLength(tasks, "1", projectId)}</p>
                    </div>
                    <div className="tasks-list">
                        {tasks.map((task, index) => {
                            console.log(task)
                            if (task.category === "1" && projectId === task.project) {
                                return (
                                    <div className='task-todo'>
                                        <TaskListItem key={index} task={task} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="tasks-column">
                    <div className="tasks-header">
                        <h2 className="tasks-title">&#9782; Ongoing</h2>
                        <p className="tasks-count">{TasksLength(tasks, "2", projectId)}</p>
                    </div>
                    <div className="tasks-list">
                        {tasks.map((task, index) => {
                            if (task.category === "2" && projectId === task.project) {
                                return (
                                    <div>
                                        <div className='task-ongoing'>
                                            <TaskListItem key={index} task={task} />
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
                        <p className="tasks-count">{TasksLength(tasks, "3", projectId)}</p>
                    </div>
                    <div className="tasks-list">
                        {tasks.map((task, index) => {
                            if (task.category === "3" && projectId === task.project) {
                                return (
                                    <div className='task-completed'>
                                        <TaskListItem key={index} task={task} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="tasks-column">
                    <div className="tasks-header">
                        <h2 className="tasks-title">&#9782; Reviewed</h2>
                        <p className="tasks-count">{TasksLength(tasks, "4", projectId)}</p>
                    </div>
                    <div className="tasks-list">
                        {tasks.map((task, index) => {
                            if (task.category === "4" && projectId === task.project) {
                                return (
                                    <div className='task-reviewed'>
                                        <TaskListItem key={index} task={task} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <AddTaskButton />
                </div>
            </div>
        </div>
    )
}

export default TasksListPage
