import React from 'react';
import Websocket from 'react-websocket';
import moment from 'moment';

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            time: ''
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        const result = JSON.parse(data);
        result.time = moment(result.time, moment.ISO_8601).format('hh:mm:ss');
        this.setState(result);
    }

    render() {
        return (
            <div style={{fontSize: '1.5em'}}>
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

export default ProductDetail;
