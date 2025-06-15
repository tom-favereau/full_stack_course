import { useState, useEffect } from 'react'
import personService from "./services/persons.js"
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [id, setId] = useState(1)
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
                const maxId = data.length > 0 ? Math.max(...data.map(elem => elem.id)) : 0
                setId(maxId + 1)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(p => p.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...existingPerson, number: newNumber }

                personService
                    .update(existingPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setSuccessMessage(`Modified ${returnedPerson.name}`)
                        setTimeout(() => setSuccessMessage(null), 5000)
                    })
                    .catch(error => {
                        const backendMessage = error.response?.data?.error || 'Unknown error'
                        setErrorMessage(backendMessage)
                        setTimeout(() => setErrorMessage(null), 5000)
                        setPersons(persons.filter(p => p.id !== existingPerson.id))
                    })
            }
            return
        }

        const newPerson = {  name: newName, number: newNumber}//, id:id.toString() }
        //const alreadyExists = persons.some(person => person.name === newName)
        //if (alreadyExists) {
        //    alert(`${newName} is already added to phonebook`)
        //    return
        //}
        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setId(id+1)
                setSuccessMessage(`Added ${returnedPerson.name}`)
                setTimeout(() => setSuccessMessage(null), 5000)
            })
            .catch(error => {
                console.log('fail')
                const backendMessage = error.response?.data?.error || 'Unknown error'
                console.log(backendMessage)
                setErrorMessage(backendMessage)
                setTimeout(() => setErrorMessage(null), 5000)
                //setPersons(persons.filter(p => p.id !== existingPerson.id))
            })
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
        //person.name.toLowerCase().startsWith(filter.toLowerCase())
    )

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            personService
                .remove(id.toString())
                .then(() => setPersons(persons.filter(p => p.id !== id)))
                .catch(error => {
                    setErrorMessage(`Information of ${newName} has already been removed from server`)
                    setTimeout(() => setErrorMessage(null), 5000)
                    //setPersons(persons.filter(p => p.id !== existingPerson.id))
                })
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <NotificationSuccess message={successMessage} />
            <NotificationError message={errorMessage} />

            < Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h2>Add a new</h2>

            < PersonFrom addPerson={addPerson}
                         handleNameChange={handleNameChange}
                         handleNumberChange={handleNumberChange}
                         newName={newName}
                         newNumber={newNumber}
            />

            <h2>Numbers</h2>
            <div>
                {personsToShow.map(elem =>
                    <Person key={elem.id} person={elem} handleDelete={handleDelete}/>
                )}
            </div>
        </div>
    )
}


const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}

const PersonFrom = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button onClick={addPerson} type="submit">add</button>
            </div>
        </form>
    )
}
const Person = ({person, handleDelete}) => {

    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
    )
}

const NotificationSuccess = ({ message }) => {
    if (message === null) return null
    return (
        <div className="success">
            {message}
        </div>
    )
}

const NotificationError = ({ message }) => {
    if (message === null) return null
    return (
        <div className="error">
            {message}
        </div>
    )
}



export default App