import React, { Component } from 'react';
import './Design.css';
import { Container, Row, Col, Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import ColorPicker from '../ColorPicker/ColorPicker';
import Graphic from '../Graphic/Graphic';
import Text from '../Text/Text';

const background = require('../../images/Fractal.png');

class Design extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.selectStyle = this.selectStyle.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectGraphic = this.selectGraphic.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.addShirtText = this.addShirtText.bind(this);
        this.changeTextFont = this.changeTextFont.bind(this);
        this.makeDraggable = this.makeDraggable.bind(this);

        this.state = {
            activeTab: '1',
            styleList: [{ image: 'MensShirt-', description: 'Mens Fine Jersey Short Sleeve' },
            { image: 'WomensShirt-', description: 'Womens Fine Jersey Short Sleeve' }],
            colors: [{ name: 'White', backgroundColor: '#FFFFFF' }, { name: 'Grey', backgroundColor: '#CDCDCD' }, { name: 'Black', backgroundColor: '#444444' }, { name: 'Blue', backgroundColor: '#2674A8' }, { name: 'Green', backgroundColor: '#44A265' }, { name: 'Yellow', backgroundColor: '#F4DA70' }, { name: 'Purple', backgroundColor: '#6E5BD6' }, { name: 'Red', backgroundColor: '#A7386B' }],
            selectedStyle: 'MensShirt-',
            selectedShirtColor: 'White',
            selectedGraphic: '',
            selectedGraphicColor: 'White',
            selectedTextColor: 'White',
            shirtText: '',
            fontStyle: "'Montserrat', sans-serif"
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
        });
    }

    selectColor(color, attribute) {
        switch (attribute) {
            case 'shirt':
                this.setState({
                    selectedShirtColor: color.name
                });
                break;
            case 'text':
                this.setState({
                    selectedTextColor: color.backgroundColor
                });
                break;
            case 'graphic':
                this.setState({
                    selectedGraphicColor: color.name
                });
                break;
            default:
                this.setState({
                    selectedGraphicColor: 'White'
                });
        }
    }

    selectGraphic = (graphic) => {
        this.setState({ selectedGraphic: graphic });
        // Show Image
        this.refs.graphicImage.style.display = "block";
        // Make Image draggable
        this.makeDraggable(this.refs.graphicImage);
    }

    addShirtText = (text) => {
        this.setState({
            shirtText: text
        })
        // Make Text draggable
        this.makeDraggable(this.refs.text);
    }

    changeTextFont = (event) => {
        this.setState({ fontStyle: event.target.value });
    }

    makeDraggable = (element) => {
        let mousePosition;
        let offset = [0, 0];
        let isDown = false;
        element.addEventListener('mousedown', function (e) {
            isDown = true;
            offset = [
                element.offsetLeft - e.clientX,
                element.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function () {
            isDown = false;
        }, true);

        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {

                    x: event.clientX,
                    y: event.clientY

                };
                element.style.left = (mousePosition.x + offset[0]) + 'px';
                element.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

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
                                    <ColorPicker selectColor={this.selectColor} attribute={'shirt'} selectedColor={this.state.selectedShirtColor} title={'Choose a shirt colour'} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Graphic selectedGraphic={this.state.selectedGraphic} selectGraphic={this.selectGraphic} />
                                    <hr />
                                    <ColorPicker selectColor={this.selectColor} attribute={'graphic'} selectedColor={this.state.selectedGraphicColor} title={'Change graphic colour'} />
                                </TabPane>
                                <TabPane tabId="4">
                                    <Text text={this.state.shirtText} addShirtText={this.addShirtText} changeTextFont={this.changeTextFont} />
                                    <ColorPicker selectColor={this.selectColor} attribute={'text'} selectedColor={this.state.selectedTextColor} title={'Change text colour'} />
                                </TabPane>
                            </TabContent>
                        </Card>
                    </Col>
                    <Col className="style-config-col">
                        <Card className="img-configurator">
                            <img className="img-fluid" src={require(`../../images/${this.renderImage(this.state.selectedStyle, this.state.selectedShirtColor)}.jpg`)} alt="shirt style" />
                            <img ref="graphicImage" className="img-fluid graphic-img" style={{ display: 'none' }} src={this.state.selectedGraphic ? require(`../../images/${this.state.selectedGraphic}`) : ''} alt="shirt graphic" />
                            <div ref="text" className="shirt-text" style={{ color: this.state.selectedTextColor, fontFamily: this.state.fontStyle }}>{this.state.shirtText}</div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;