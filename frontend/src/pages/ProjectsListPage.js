import React, { useState, useEffect } from 'react'
import ProjectListItem from '../components/ProjectListItem'
import AddProjectButton from '../components/AddProjectButton'

const ProjectsListPage = () => {

    let [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects()
    }, [])

    let getProjects = async () => {

        let response = await fetch('/api/projects/')
        let data = await response.json()
        setProjects(data)
    }

    return (
        <div >
            <div className="tasks-header">
                <h2 className="tasks-title">All projects</h2>
            </div>
            <div className="projects-column">

            </div>
            <div className="tasks-list">
                {projects.length === 0 ? (
                    <div class="intro-page">
                        <h2 align="center">Welcome to MCIT Task Manager!</h2>
                        <br></br>
                        <body>
                            <p>
                                This task manager is made by a few MCIT students (Justin, Randy, Sean, Shagun, Tim) over the course of a weekend
                                for the MCIT 2021 winter hackathon. We hope you'll like it!
                            </p>
                            <br></br>
                            <p><b>Starter Guide on using this Task Manager:</b></p>
                            <ul>
                                <li>Add a new project with the + button at bottom right</li>
                                <li>In each new project, you can create new tasks</li>
                                <li>Tasks are separated into four categories represented by different colors</li>
                                <li>You can edit / delete tasks and even entire projects!</li>
                            </ul>
                            <br></br>
                            <p><b>Get started and enjoy!</b></p>
                        </body>
                    </div>
                ) : (
                    projects.map((project, index) => {
                        return (
                            <ProjectListItem key={index} project={project} />
                        )
                    }))
                }
            </div>
            <AddProjectButton />
        </div>
    )
}

export default ProjectsListPage
