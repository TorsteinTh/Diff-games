import React, { Component } from "react";
import { Icon } from "antd";



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
                <Icon type="clock-circle" theme="filled" />
                : {this.state.seconds} sec
            </div>
        );
    }
}
export default Timer
