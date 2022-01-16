import React, { useState, useEffect } from 'react'
import ProjectListItem from '../components/ProjectListItem'
import AddProjectButton from '../components/AddProjectButton'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const ProjectsListPage = () => {

    let [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects()
    }, [])

    // const TasksLength = (tasks, category) => {
    //     let count = 0;
    //     tasks.map((task, index) => {
    //         if (task.category === category) {
    //             count++;
    //         }
    //     })
    //     return count;
    // }

    let getProjects = async () => {

        let response = await fetch('/api/projects/')
        let data = await response.json()
        setProjects(data)
    }

    return (
        <div className="tasks-list-all">

            <div className="tasks-column">
                <div className="tasks-header">
                    <h2 className="tasks-title">&#9782;All projects</h2>
                    {/* <p className="tasks-count">{TasksLength(tasks, "1")}</p> */}
                </div>
                <div className="tasks-list">
                    {projects.map((project, index) => {
                        return (
                            <div className='task-todo'>
                                <ProjectListItem key={index} project={project} />
                            </div>
                        )
                    })}
                </div>

                <AddProjectButton />
            </div>
        </div>
    )
}

export default ProjectsListPage
