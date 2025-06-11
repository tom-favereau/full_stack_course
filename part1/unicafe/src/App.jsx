import { useState } from 'react'

const App = () => {
    const title = "give feedback"

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    const handleVote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    };


    return (
        <div>
            < Header title={title}/>


            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />


            < Statistics stats={{good, neutral, bad}}/>


        </div>
    )
}

const Header = (props) => {
    return (<h1>{props.title}</h1>)
}



const Statistics = (props) => {
    const good = props.stats.good;
    const neutral = props.stats.neutral;
    const bad = props.stats.bad;

    const somme = good + neutral + bad;

    if (somme === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        );
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                <tbody>
                <StatisticLine text="good" value={good} symb="" />
                <StatisticLine text="neutral" value={neutral} symb="" />
                <StatisticLine text="bad" value={bad} symb="" />
                <StatisticLine text="all" value={somme}  symb=""/>
                <StatisticLine text="average" value={(good - bad) / somme} symb="" />
                <StatisticLine text="positive" value={(100 * good / somme)} symb="%" />
                </tbody>
                </table>
            </div>
        );
    }
}

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({ text, value, symb }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {symb}</td>
        </tr>
    );
};



export default App