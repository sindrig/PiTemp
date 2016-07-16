import { Button } from 'react-bootstrap';
import React from 'react';
import Form from './Form';

export default class Actions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editing: false};
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    toggleEditing() {
        this.setState({editing: !this.state.editing});
    }

    render() {
        if (this.state.editing) {
            return <Form onSuccess={this.toggleEditing} {...this.props} />;
        }
        return <Button bsStyle="primary" onClick={this.toggleEditing}>Set limits</Button>;
    }
}

Actions.propTypes = {
    setMax: React.PropTypes.func.isRequired,
    setMin: React.PropTypes.func.isRequired,
    currentMax: React.PropTypes.number,
    currentMin: React.PropTypes.number
};
