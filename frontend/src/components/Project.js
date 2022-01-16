import React, { useState, useEffect } from 'react'


const Project = () => {

    let [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    let getTasks = async () => {

        let response = await fetch('/api/tasks/')
        let data = await response.json()
        setTasks(data)
    }

    let projectList = [""]

    return (
        <div className="project-name">
            <h2>  Project List</h2>
            <body>
                <b>  </b>
                {tasks.map((task, index) => {
                    if (!projectList.includes(task.project)) {
                        projectList.push(task.project)
                        return (
                            <button>{task.project} </button>
                        )
                    }
                })}
            </body>
        </div>
    )
}

export default Project