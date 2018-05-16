import React, { Component } from 'react';
import './Catalog.css';
import classnames from 'classnames';
import { Container, Row, Navbar, NavbarToggler, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import Shirt from '../Shirt/Shirt';
import Cart from '../Cart/Cart';
import SidenavShipping from '../SidenavShipping/SidenavShipping';
import Payment from '../Payment/Payment';
import Confirmation from '../Confirmation/Confirmation';

import { shirtList } from '../Models/ShirtListModel';


class Catalog extends Component {

    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
        this.openCart = this.openCart.bind(this);
        this.closeCart = this.closeCart.bind(this);
        this.openShipping = this.openShipping.bind(this);
        this.openPayment = this.openPayment.bind(this);
        this.checkout = this.checkout.bind(this);
        this.goToCatalog = this.goToCatalog.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        this.state = {
            activeTab: '1',
            showConfirmation: false,
            shirtsInCart: [],
            sidenavOpen: false
        };
    }

    handleClick() {
        if (!this.state.sidenavOpen) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            sidenavOpen: !prevState.sidenavOpen,
        }));
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if ((e.target.className !== 'overlay')) {
            return;
        }

        this.closeCart();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    openCart = () => {
        this.setState({ sidenavOpen: true });
        console.log('Cart Open');
        this.refs.cart.style.width = "100%";
        this.refs.overlay.style.display = "block";
        this.handleClick();
    }

    closeCart = () => {
        this.setState({ sidenavOpen: false });
        console.log('Cart Closed');
        this.refs.cart.style.width = "0";
        this.refs.overlay.style.display = "none";
        this.refs.shipping.style.width = "0";
        this.refs.cart.style.right = "0";
        this.refs.shipping.style.right = "0";
        this.refs.shippingOverlay.style.display = "none";
        this.refs.cartOverlay.style.display = "none";
        this.refs.payment.style.width = "0";
        this.setState({
            showConfirmation: false
        })
    }

    openShipping = () => {
        console.log('Go To Shipping');
        this.refs.cart.style.right = "385px";
        this.refs.shipping.style.width = "100%";
        this.refs.cartOverlay.style.display = "block";
        this.refs.cartOverlay.style.right = "385px";
    }

    openPayment = () => {
        console.log('Go To Payment');
        this.refs.cart.style.right = "770px";
        this.refs.cartOverlay.style.right = "770px";
        this.refs.payment.style.width = "100%";
        this.refs.shipping.style.right = "385px";
        this.refs.shippingOverlay.style.display = "block";

    }

    checkout = () => {
        console.log('Go To Checkout');
        this.setState({
            showConfirmation: true
        })
        this.refs.payment.style.width = "100%";
        this.refs.cart.style.width = "0";
        this.refs.shipping.style.width = "0";
        this.refs.shippingOverlay.style.display = "none";
        this.refs.cartOverlay.style.display = "none";
    }

    goToCatalog = () => {
        console.log('Go Back To Catalog');
        // Reset fixed positioning for all 3 side nav components and set showConfirmation to false 
        this.refs.payment.style.width = "0";
        this.refs.overlay.style.display = "none";
        this.refs.cart.style.width = "0";
        this.refs.cart.style.right = "0";
        this.refs.shipping.style.width = "0";
        this.refs.shipping.style.right = "0";
        this.setState({
            showConfirmation: false
        })
    }

    addToCart = (shirt) => {
        console.log('Add to Cart');
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });

        if (index !== -1) {
            cartItems[index].quantity += 1;
        } else {
            shirt.quantity += 1;
            cartItems.push(shirt);
        }
        this.setState({
            shirtsInCart: cartItems
        });
    }

    removeFromCart = (shirt) => {
        console.log('Remove');
        shirt.quantity = 0;
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        cartItems.splice(index, 1);
        this.setState({
            shirtsInCart: cartItems
        });
    }

    updateQuantity = (event) => {
        console.log('Update');
    }

    render() {
        return (
            <div>
                <div id="cart" className="sidenav-cart" ref="cart">
                    <div className="cart-overlay" ref="cartOverlay"></div>
                    <Cart openShipping={this.openShipping} closeCart={this.closeCart} shirtsInCart={this.state.shirtsInCart} removeFromCart={this.removeFromCart} updateQuantity={this.updateQuantity} />
                </div>
                <div className="sidenav-shipping" ref="shipping">
                    <div className="shipping-overlay" ref="shippingOverlay"></div>
                    <SidenavShipping openPayment={this.openPayment} />
                </div>
                <div className={!this.state.showConfirmation ? "sidenav-payment" : "sidenav-confirmation"} ref="payment">
                    {!this.state.showConfirmation ? <Payment checkout={this.checkout} /> : <Confirmation goToCatalog={this.goToCatalog} />}
                </div>
                <Navbar color="faded" light>
                    <Row className="nav-toggle-btn">
                        <NavbarToggler className="mr-2" />
                        <div className="vr"></div>
                    </Row>
                    <Row className="cart-btn-container">
                        <button className="primary-btn nav-btn">NEW DESIGN</button>
                        <div className="vr"></div>

                        <Row className="cart-btn" onClick={() => { this.openCart(); }}>
                            <div className="nav-icon-basket"></div>
                            <div className="cart-count">{this.state.shirtsInCart.length}</div>
                        </Row>
                    </Row>
                </Navbar>
                <Container fluid className="fluid-container">
                    <div className="overlay" ref="overlay"></div>
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
            </div>
        );
    }
}

export default Catalog;