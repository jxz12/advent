import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }
    render() {
        return (
            <button className="present" onClick={() => this.open()}>
                {this.props.available ? this.props.contents : this.props.label}
            </button>
        );
    }
    click() {
        console.log(this.props.contents);
    }
}

class Tree extends React.Component {
    constructor(props) {
        super(props);

        // randomise order of presents so it's different each time
        const shuffled = Array
            .from(Array(10).keys())
            .map(value => ({ value, rand: Math.random() }))
            .sort((a, b) => a.rand - b.rand)
            .map(({ value }) => value)
        ;
        this.state = {
            order: shuffled,
        };
    }
    render() {
        const presents = this.props.puzzles.map((puzzle, idx) => {
            return (
                <Present
                    label={this.props.puzzles.length-idx}
                    contents={puzzle.question}
                    available={idx <= this.props.nSolved}
                    key={idx}
                />
            );
        });
        const shuffledPresents = this.state.order.map((newIdx) => {
            return presents[newIdx]
        });
        return (
            <div>
                <div className="tree-row">
                    {shuffledPresents}
                </div>
            </div>
        );
    }
}

class Card extends React.Component {
    puzzles = [
        {question: '🤜🍎🤛', answer: 'squash'},
        {question: '🍅🥦🧀', answer: 'vegetarian'},
        {question: '✡️👠', answer: 'juil'},
        {question: '🚫🤨️⚡', answer: 'privacy'},
        {question: '️😬🦵', answer: 'jonny'},
        {question: '🧠🎩👗', answer: 'neural topic modelling'},
        {question: '🌞🍋', answer: 'yang'},
        {question: '🥱👨‍❤️‍💋‍👨🤔', answer: 'board games'},
        {question: '🤰🇬🇭', answer: 'marga'},
        {question: '🌄💩', answer: 'phd'},
    ]
    constructor(props) {
        super(props);
        this.state = {
            nSolved: 0,
            feedback: "",
        };
    }
    attempt(event) {
        event.preventDefault();  // prevents page from refreshing
        const guess = event.currentTarget.elements.guess.value.toLowerCase();
        if (this.puzzles[this.state.nSolved].answer === guess) {
            this.setState({
                nSolved: this.state.nSolved + 1,
                feedback: "Correct!",
            });
            event.currentTarget.elements.guess.value = "";
        } else {
            this.setState({
                nSolved: this.state.nSolved,
                feedback: "Wrong :(",
            });
        }
    }
    render() {
        const finished = this.state.nSolved >= this.puzzles.length
        const feedback = finished ? "FINISHED" : this.state.feedback;
        return (
            <div className="card">
                <div className="card-tree">
                    <Tree puzzles={this.puzzles} nSolved={this.state.nSolved} />
                </div>
                <div className="card-input">
                    <form onSubmit={(event) => this.attempt(event)}>
                        <label>{feedback}</label>
                        <input
                            type="text"
                            disabled={finished}
                            id="guess"
                            placeholder="Guess"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Card />);
