import React, { useState, useEffect } from 'react'
import TaskListItem from '../components/TaskListItem'
import AddTaskButton from '../components/AddTaskButton'
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

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

    const handleProjectChange = (id) => {
        useHist.push(`/${id}/tasks`)
    }

    let projectName = ""
    projects.map((project) => {
        if (project.id === projectId) {
            projectName = project.project;
            console.log(project.project)
        }
    })


    return (
        <div>
            <select defaultValue={projectName} onChange={(e) => { handleProjectChange(e.target.value) }}>
                {projects.map((project) => {
                    return (
                        <option value={project.id}>{project.project}</option>
                    )
                }
                )}
            </select>
            <div className="task-header">
                <ArrowLeft onClick={() => useHist.push("/")}></ArrowLeft>
            </div>

            <div className="tasks-list-all">
                <div className="tasks-column">
                    <div className="tasks-header">
                        <h2 className="tasks-title">&#9782;To do</h2>
                        <p className="tasks-count">{TasksLength(tasks, "1", projectId)}</p>
                    </div>
                    <div className="tasks-list">
                        {tasks.map((task, index) => {
                            if (task.category === "1" && projectId === task.project) {
                                return (
                                    <div className='task-todo'>
                                        <TaskListItem key={index} task={task} match={match} />
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
                                            <TaskListItem key={index} task={task} match={match} />
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
                                        <TaskListItem key={index} task={task} match={match} />
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
                                        <TaskListItem key={index} task={task} match={match} />
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
