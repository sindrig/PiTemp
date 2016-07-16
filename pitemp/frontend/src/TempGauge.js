import React from 'react';
import Websocket from 'react-websocket';
import moment from 'moment';

class TempGauge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            time: '',
            error: false
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        const result = JSON.parse(data);
        result.time = moment(result.time, moment.ISO_8601).format('hh:mm:ss');
        let error = false;
        if (this.props.minHeat) {
            error = this.state.temperature < this.props.minHeat;
        }
        if (this.props.maxHeat) {
            error = error || this.state.temperature > this.props.maxHeat;
        }
        this.setState(Object.assign({error}, result));
        this.props.onChange(result);
    }

    fontColor() {
        return this.state.error ? 'red' : 'black';
    }

    style() {
        return {
            fontSize: '1.5em',
            color: this.fontColor()
        };
    }

    render() {
        return (
            <div style={this.style()}>
                <div>Current temperature: <strong>{this.state.temperature}</strong></div>
                <div>Last temp: {this.state.time}</div>

                <Websocket
                    url={`ws://${window.location.host}/temperature`}
                    onMessage={this.handleData}
                />
            </div>
      );
    }
}

TempGauge.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    maxHeat: React.PropTypes.number,
    minHeat: React.PropTypes.number,
    currentHeat: React.PropTypes.number.isRequired
};

export default TempGauge;
