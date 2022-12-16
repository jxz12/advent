import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Present extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: props.value,
    //     }
    // }
    render() {
        return (
            <button className="present" onClick={()=> console.log(this.props.prize)}>
                {this.props.prize}
            </button>
        );
    }
    // click() {
    //     // DO NOT DO THIS, state.value should be treated as immutable
    //     // this.state.value = 'X';

    //     this.setState({value: 'X'});

    //     // setState is async so this does not print anything
    //     // https://stackoverflow.com/questions/54713510/console-log-after-setstate-doesnt-return-the-updated-state
    //     console.log(this.state.value);
    // }
    // componentDidUpdate() {
    //     console.log(this.state.value);
    // }
}

class Tree extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // randomise order of presents
    //     // layout presents in tree shape
    // }
    render() {
        const presents = [];
        for (const [key, val] of Object.entries(this.props.puzzles)) {
            presents.push(
                <Present
                    prize={val}

                    // this needs a .bind because of weird 'this' behaviour in javascript
                    // https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
                    // click={this.click}
                    // click={this.click.bind(this)}
                    // onClick={()=> this.onClickPresent(i)}
                />
            )
        }
        return (
            <div>
                <div className="tree-row">
                    {presents}
                </div>
            </div>
        );
    }
    // onClickPresent(i) {
    //     const presents = this.state.presents.slice();
    //     if (this.state.xTurn) {
    //         presents[i] = 'X';
    //     } else {
    //         presents[i] = 'O';
    //     }
    //     this.setState({
    //         presents: presents,
    //         xTurn: !this.state.xTurn,
    //     });
    // }
}

class Card extends React.Component {
    puzzles = {
        'squash': '🤜🍎🤛',
        'vegetarian': '🍅🥦🧀',
        'juil': '✡️👠',
        'privacy': '🚫🤨️⚡',
        'jonny': '️😬🦵',
        'neural topic modelling': '🧠🎩👗',
        'yang': '🌞🍋',
        'board games': '🥱👨‍❤️‍💋‍👨🤔',
        'marga': '🤰🇬🇭',
        'phd': '🌄💩',
    }
    constructor(props) {
        super(props);
        this.state = {
            solved: Array(10).fill(false),
        }
    }
    render() {
        return (
            <div className="card">
                <div className="card-tree">
                    <Tree puzzles={this.puzzles} />
                </div>
                <div className="card-info">
                    <input>{/* input text */}</input>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Card />);
