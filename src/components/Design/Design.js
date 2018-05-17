import React, { Component } from 'react';
import './Design.css';
import { Container, Row, Col, Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const background = require('../../images/Fractal.png');

class Design extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.selectStyle = this.selectStyle.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.renderImage = this.renderImage.bind(this);

        this.state = {
            activeTab: '1',
            styleList: [{ image: 'MensShirt-', description: 'Mens Fine Jersey Short Sleeve' },
            { image: 'WomensShirt-', description: 'Womens Fine Jersey Short Sleeve' }],
            colors: [{ name: 'White', backgroundColor: '#FFFFFF' }, { name: 'Grey', backgroundColor: '#CDCDCD' }, { name: 'Black', backgroundColor: '#444444' }, { name: 'Blue', backgroundColor: '#2674A8' }, { name: 'Green', backgroundColor: '#44A265' }, { name: 'Yellow', backgroundColor: '#F4DA70' }, { name: 'Purple', backgroundColor: '#6E5BD6' }, { name: 'Red', backgroundColor: '#A7386B' }],
            selectedStyle: 'MensShirt-',
            selectedColor: 'White'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    selectStyle(style) {
        this.setState({
            selectedStyle: style
        })
    }

    selectColor(color) {
        this.setState({
            selectedColor: color
        })
    }

    renderImage(image, color) {
        return image + color.toLowerCase();
    }

    render() {
        return (
            <Container fluid className="design-container">
                <div className="design-background">
                    <img src={background} alt="background" />
                </div>
                <Row className="style-config-row">
                    <Col className="style-config-col">
                        <Card className="style-card">
                            <Nav tabs className="style-tabs">
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>Styles</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>Colours</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>Graphics</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                                        onClick={() => { this.toggle('4'); }}>Text</NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Container fluid className="select-style-container">
                                        <div className="style-title">Choose a shirt style</div>
                                        <Row className="select-style-row">
                                            {this.state.styleList.map((style, index) => (
                                                <Col key={index}>
                                                    <div className={"style-img-container " + classnames({ active: this.state.selectedStyle === style.image })} onClick={() => { this.selectStyle(style.image); }}>
                                                        <img className="img-fluid" src={require(`../../images/${this.renderImage(style.image, 'white')}.jpg`)} alt="shirt style" />
                                                    </div>
                                                    <div className="style-description">{style.description}</div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Container className="select-style-container">
                                        <div className="style-title">Choose a shirt style</div>
                                        <Row className="select-color-row">
                                            {this.state.colors.map((color, index) => (
                                                <Col key={index}>
                                                    <div className={"style-color-container " + classnames({ active: this.state.selectedColor === color.name })} onClick={() => { this.selectColor(color.name); }} style={color}>
                                                    </div>
                                                    <div className="color-name">{color.name}</div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </TabPane>
                                <TabPane tabId="3"></TabPane>
                                <TabPane tabId="4"></TabPane>
                            </TabContent>
                        </Card>
                    </Col>
                    <Col className="style-config-col">
                        <Card className="img-configurator">
                            <img className="img-fluid" src={require(`../../images/${this.renderImage(this.state.selectedStyle, this.state.selectedColor)}.jpg`)} alt="shirt style" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;