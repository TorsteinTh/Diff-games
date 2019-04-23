import React, { Component } from "react"



class Timer extends Component {
    constructor(props) {
        super(props)
        this.countDown = this.countDown.bind(this);
        this.state = { seconds: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(this.countDown, 1000);
    }


    countDown() {
        this.setState({
            seconds: this.state.seconds + 1,
        });
        this.props.time_used(this.state.seconds)

    }

    stopCountDown = () => {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                <h1>
                    Your time: {this.state.seconds}
                </h1>
            </div>
        );
    }
}
export default Timer
