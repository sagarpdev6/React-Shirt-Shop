import React, { Component } from 'react';
import './Catalog.css';
import classnames from 'classnames';
import { Container, Row, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

class Catalog extends Component {

    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
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
            <div>
                <Navbar color="faded" light>
                    <NavbarToggler className="mr-2" />
                </Navbar>
                <Container fluid>
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
                        </TabPane>
                        <TabPane tabId="2">
                            {/* Men Shirt List Goes Here */}
                        </TabPane>
                        <TabPane tabId="3">
                            {/* Women Shirt List Goes Here */}
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        );
    }
}

export default Catalog;