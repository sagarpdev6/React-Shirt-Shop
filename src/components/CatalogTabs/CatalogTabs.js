import React, { Component } from 'react';
import './CatalogTabs.css';
import classnames from 'classnames';
import { Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import Shirt from '../Shirt/Shirt';

import { shirtList } from '../Models/ShirtListModel';

class CatalogTabs extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = {
            activeTab: '1'
        };
    }

    addToCart = (shirt) => {
        this.props.addToCart(shirt);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Container fluid className="fluid-container">
                <Nav tabs className="catalog-tabs">
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>All Designs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>Men</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}>Women</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        {/* All Shirt List Goes Here */}
                        <Row>
                            {shirtList.map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={this.addToCart} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        {/* Men Shirt List Goes Here */}
                        <Row>
                            {shirtList.filter(shirt => { return shirt.gender === 'M' }).map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={this.addToCart} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        {/* Women Shirt List Goes Here */}
                        <Row>
                            {shirtList.filter(shirt => { return shirt.gender === 'F' }).map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={this.addToCart} />
                            ))}
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        );
    }
}

export default CatalogTabs;