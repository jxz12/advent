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
        const state = this.props.locked
            ? 'locked'
            : this.state.opened
                 ? 'opened'
                 : 'unlocked'
        ;
        return (
            <button
                className={`present-${state}`}
                disabled={this.props.locked}
                onClick={() => this.open()}
            >
                {this.state.opened ? this.props.contents : this.props.label}
            </button>
        );
    }
    open() {
        this.setState({
            opened: true,
        });
    }
}

class Tree extends React.Component {
    constructor(props) {
        super(props);

        // randomise order of presents so it's different each time
        const shuffled = Array
            .from(Array(props.puzzles.length).keys())
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
                    locked={idx > this.props.nSolved}  // this is ugly
                    key={idx}
                />
            );
        });
        const shuffledPresents = this.state.order.map((newIdx) => {
            return presents[newIdx]
        });
        const rows = [];
        let i=0;
        while (i<presents.length) {
            const row = [];
            for (let j=0; j<rows.length; j++) {
                row.push(shuffledPresents[i]);
                i++;
            }
            rows.push(<div className='tree-row' key={rows.length}>{row}</div>);
        }
        return (
            <div>
                <div className='tree-row'>
                    <div className='present-star'>
                        <h1>{this.props.showStar ? '⭐' : ''}</h1>
                    </div>
                </div>
                {rows}
                <div className='tree-row'>
                    <div className='present-trunk' />
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
    ];
    messages = {
        'welcome': 'Merry Christmas Pamela & SFS! Enjoy this advent calendar :)',
        'correct': 'Correct!',
        'incorrect': 'Wrong :(',
        'finished': '🎄 🧑‍🎄 ❄️ Fröhliche Weihnachten! 🎁 💶 ☃️',
    };
    constructor(props) {
        super(props);
        this.state = {
            nSolved: 0,
            nAttempts: 0,
            message: 'welcome',
        };
    }
    attempt(event) {
        event.preventDefault();  // prevents page from refreshing lol

        const guess = event.currentTarget.elements.guess.value.toLowerCase();
        const answer = this.puzzles[this.state.nSolved].answer;

        let message = 'welcome';
        let nSolved = this.state.nSolved;
        if (guess === answer) {
            message = 'correct'
            nSolved += 1;
            event.currentTarget.elements.guess.value = '';
        } else if (guess === 'sfs') {
            nSolved = this.puzzles.length;
        } else {
            message = 'incorrect';
        }
        if (nSolved >= this.puzzles.length) {
            message = 'finished';
        }
        this.setState({
            nSolved: nSolved,
            nAttempts: this.state.nAttempts + 1,
            message: message,
        })
    }
    render() {
        const message = this.messages[this.state.message];
        const finished = this.state.message === 'finished';
        const key = this.state.nAttempts;  // forces react to retrigger animation
        return (
            <div className='card'>
                <div className='tree'>
                    <Tree
                        puzzles={this.puzzles}
                        nSolved={this.state.nSolved}
                        showStar={finished}
                    />
                    <div className='guess'>
                        <form onSubmit={(event) => this.attempt(event)} autoComplete='off'>
                            <div key={key} className={`message-${this.state.message}`}>
                                <label>{message}</label>
                            </div>
                            <div className='attempt'>
                                <input
                                    type='text'
                                    disabled={finished}
                                    id='guess'
                                    placeholder={finished ? 'Well done!' : 'Guess here'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Card />);
