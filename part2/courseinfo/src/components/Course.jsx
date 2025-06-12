const Course = ({course}) => {
    const name = course.name
    const parts = course.parts
    return (
        <div>
            < Header name={name}/>
            < Content parts={parts}/>
            < Total parts={parts}/>

        </div>
    )
}

const Header = ({name}) => {
    return (<h1>{name}</h1>)
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(elem =>
                <Part key={elem.name} name={elem.name} exercises={elem.exercises}/>)}
        </div>
    )
}


const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>)
}

const Total = ({parts}) => {
    return (<b>Total of {parts.reduce((acc, elem) => acc + elem.exercises, 0)} exercices</b>)
}

export default Course