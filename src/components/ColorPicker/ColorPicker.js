import React, { Component } from 'react';
import './ColorPicker.css';
import { Row } from 'reactstrap';
import classnames from 'classnames';

class ColorPicker extends Component {

    constructor() {
        super();

        this.state = {
            colors: [{ name: 'White', backgroundColor: '#FFFFFF' }, { name: 'Grey', backgroundColor: '#CDCDCD' }, { name: 'Black', backgroundColor: '#444444' }, { name: 'Blue', backgroundColor: '#2674A8' }, { name: 'Green', backgroundColor: '#44A265' }, { name: 'Yellow', backgroundColor: '#F4DA70' }, { name: 'Purple', backgroundColor: '#6E5BD6' }, { name: 'Red', backgroundColor: '#A7386B' }]
        }
        this.selectColor = this.selectColor.bind(this);
    }

    selectColor(color) {
        this.setState({ selectedColor: color });
        this.props.selectColor(color, this.props.attribute);
    }

    render() {
        return (
            <div className="color-picker-container">
                <div className="color-picker-title">{this.props.title}</div>
                <Row className="color-picker-row">
                    {this.state.colors.map((color, index) => (
                        <div key={index} >
                            <div className={"color-div " + classnames({ active: this.props.selectedColor === color.name })} onClick={() => { this.selectColor(color); }} style={color}>
                            </div>
                            <div className="color-name">{color.name}</div>
                        </div>
                    ))}
                </Row>
            </div>
        );
    }
}

export default ColorPicker;