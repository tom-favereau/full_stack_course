import { useState } from 'react'
import Course from "./components/Course.jsx";

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7
                },
                {
                    name: 'State of a component',
                    exercises: 14
                },
                {
                    name: 'truc',
                    exercises: 10
                },

            ]
        },
        {
            name: 'Half Stack application development duplicate',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7
                },
                {
                    name: 'State of a component',
                    exercises: 14
                },
                ]
        }
    ]

    return (
        <div>
            {courses.map(elem =>
                < Course key={elem.name} course={elem} />)}
        </div>
    )

}



export default App