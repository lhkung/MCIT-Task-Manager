import React, { useState, useEffect } from 'react'
import TaskListItem from '../components/TaskListItem'
import AddTaskButton from '../components/AddTaskButton'
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { RiRunFill } from 'react-icons/ri'
import { GiFinishLine } from 'react-icons/gi'
import { RiChatCheckFill } from 'react-icons/ri'

const TasksListPage = ({ match }) => {
    const useHist = useHistory();
    let projectId = parseInt((match.url).match(/\d+/)[0])
    let [tasks, setTasks] = useState([])
    let [projects, setProjects] = useState([])
    let [proj, setProject] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        getProject()
    }, [])

    const TasksLength = (tasks, category, projectId) => {
        let count = 0;
        tasks.map((task) => {
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
        window.location.reload()
    }

    let getProject = async () => {
        let response = await fetch('/api/projects/')
        let data = await response.json()
        data.map((p) => {
            if (p.id === projectId) {
                setProject(p)
            }
        })
    }


    return (
        < div >
            <div className="task-header">
                <h3>
                    <ArrowLeft onClick={() => useHist.push("/")}></ArrowLeft>
                </h3>
                <h3>&nbsp;Project: &nbsp;</h3>
                <select className="task-droplist" value={proj.id} onChange={(e) => { handleProjectChange(e.target.value) }}>
                    {projects.map((project) => {
                        return (
                            <option value={project.id}>{project.project}</option>
                        )
                    }
                    )}
                </select>

            </div>

            <div className="tasks-list-all">
                <div className="tasks-column">
                    <div className="tasks-header">
                        <AiOutlineOrderedList className="tasks-list-icon" />
                        <h2 className="tasks-title">To do</h2>
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
                        <RiRunFill className="tasks-list-icon" />
                        <h2 className="tasks-title">Ongoing</h2>
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
                        <GiFinishLine className="tasks-list-icon" />
                        <h2 className="tasks-title">Completed</h2>
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
                        <RiChatCheckFill className="tasks-list-icon" />
                        <h2 className="tasks-title">Reviewed</h2>
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
        </div >
    )
}

export default TasksListPage
