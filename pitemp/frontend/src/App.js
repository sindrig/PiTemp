import TempGauge from './TempGauge';
import { Panel } from 'react-bootstrap';
import React from 'react';
import Actions from './Actions';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxHeat: 79,
            minHeat: 77,
            currentHeat: 78
        };
        this.heatChange = this.heatChange.bind(this);
        this.setMax = this.setMax.bind(this);
        this.setMin = this.setMin.bind(this);
    }

    setMax(value) {
        const maxHeat = value ? parseInt(value, 10) : null;
        this.setState({maxHeat});
    }

    setMin(value) {
        const minHeat = value ? parseInt(value, 10) : null;
        this.setState({minHeat});
    }

    heatChange(changed) {
        const currentHeat = changed.temperature;
        this.setState({currentHeat});
    }

    style() {
        return {
            width: '80%',
            margin: '0 auto',
            textAlign: 'center',
            marginTop: '5%'
        };
    }

    render() {
        return (
            <Panel style={this.style()}>
                <TempGauge onChange={this.heatChange} {...this.state} />
                <Actions
                    currentMax={this.state.maxHeat || 0}
                    currentMin={this.state.minHeat || 0}
                    setMax={this.setMax}
                    setMin={this.setMin}
                />
            </Panel>
        );
    }
}
