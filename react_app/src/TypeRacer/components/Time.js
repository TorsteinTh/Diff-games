import React, { Component } from "react"



class Time extends Component {
    constructor(props) {
        super(props)
        this.countDown = this.countDown.bind(this);
        this.state = { seconds: 3 };
    }

    componentDidMount() {
        this.interval = setInterval(this.countDown, 1000);
    }


    countDown() {
        if (this.state.seconds === 0) {
            this.props.timer_finished()
        }
        this.setState({
            seconds: this.state.seconds - 1,
        });
    }

    stopCountDown = () => {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                <h1>
                    Starts in: {this.state.seconds}
                </h1>
            </div>
        );
    }
}
export default Time
