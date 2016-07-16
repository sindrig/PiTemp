
import { Button, Panel } from 'react-bootstrap';
import React from 'react';

class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value.replace(/(\d+).*/, '$1');
        if (value) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <label>
                {this.props.label}:
                <input type="number" value={this.props.value} onChange={this.handleChange} />
            </label>
        );
    }
}

NumberInput.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number
};

const Form = ({setMax, setMin, currentMax, currentMin, onSuccess}) => {
    return (
        <Panel style={{width: '80%'}}>
            <NumberInput
                label="Minimum temperature"
                value={currentMin}
                onChange={setMin}
            />
            <NumberInput
                label="Maximum temperature"
                value={currentMax}
                onChange={setMax}
            />
            <Button bsStyle="success" onClick={onSuccess}>Save</Button>
        </Panel>
    );
};

export default Form;

Form.propTypes = {
    setMax: React.PropTypes.func.isRequired,
    setMin: React.PropTypes.func.isRequired,
    currentMax: React.PropTypes.number.isRequired,
    currentMin: React.PropTypes.number.isRequired,
    onSuccess: React.PropTypes.func.isRequired
};
