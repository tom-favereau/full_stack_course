import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { key:0, name: 'Arto Hellas', number:"0000000" }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [key, setKey] = useState(1)
    const [filter, setFilter] = useState('')

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
        const newPerson = { key:key, name: newName, number: newNumber }
        const alreadyExists = persons.some(person => person.name === newName)
        if (alreadyExists) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setKey(key+1)
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
        //person.name.toLowerCase().startsWith(filter.toLowerCase())
    )

    return (
        <div>
            <h1>Phonebook</h1>

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
                    <Person key={elem.key} person={elem}/>
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
const Person = ({person}) => {

    return (
        <div>{person.name} {person.number}</div>
    )
}


export default App