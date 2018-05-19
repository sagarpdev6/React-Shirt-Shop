import React, { Component } from 'react';
import './Shirt.css';
import { Container, Row, Col, Card } from 'reactstrap';

class Shirt extends Component {

    addToCart = () => {
        this.props.addToCart(this.props.shirt);
    }

    render() {
        return (
            <Card className="text-center">
                {this.props.shirt.graphic ?
                    <img ref="graphicImage" className="img-fluid shirt-graphic-img" style={{ left: this.props.shirt.textElementPosition.left, top: this.props.shirt.textElementPosition.top }} src={this.props.shirt.graphic ? require(`../../images/${this.props.shirt.graphic}`) : ''} alt="shirt graphic" /> : null}
                {this.props.shirt.text ?
                    <div ref="text" className="shirt-text-final" style={{ color: this.props.shirt.textColor, fontFamily: this.props.shirt.font, left: this.props.shirt.graphicElementPosition.left, top: this.props.shirt.graphicElementPosition.top }}>{this.props.shirt.text}</div> : null}
                <img className="img-fluid" src={require(`../../images/${this.props.shirt.image}`)} alt="Shirt" />
                <h4 className="card-title">{this.props.shirt.name}</h4>
                <p className="description">{this.props.shirt.description}</p>
                <Container>
                    <Row className="btn-row">
                        <Col className="icon-basket" xs="2" onClick={() => { this.addToCart(); }}></Col>
                        <Col className="text" xs="8">
                            <strong>${this.props.shirt.price}</strong>
                        </Col>
                        <Col className="icon-edit" xs="2"></Col>
                    </Row>
                </Container>
            </Card>
        )
    }

}

export default Shirt;