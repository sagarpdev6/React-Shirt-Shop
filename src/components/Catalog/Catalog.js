import React, { Component } from 'react';
import './Catalog.css';

import { Row, Navbar, NavbarToggler } from 'reactstrap';

import Cart from '../Cart/Cart';
import SidenavShipping from '../SidenavShipping/SidenavShipping';
import Payment from '../Payment/Payment';
import Confirmation from '../Confirmation/Confirmation';
import Design from '../Design/Design';
import CatalogTabs from '../CatalogTabs/CatalogTabs';

import { shirtList } from '../Models/ShirtListModel';



class Catalog extends Component {

    constructor() {
        super();

        this.openCart = this.openCart.bind(this);
        this.closeCart = this.closeCart.bind(this);
        this.openShipping = this.openShipping.bind(this);
        this.openPayment = this.openPayment.bind(this);
        this.checkout = this.checkout.bind(this);
        this.goToCatalog = this.goToCatalog.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.openShirtDesign = this.openShirtDesign.bind(this);
        this.setShirtTitle = this.setShirtTitle.bind(this);
        this.saveShirtDesign = this.saveShirtDesign.bind(this);
        this.selectStyle = this.selectStyle.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectGraphic = this.selectGraphic.bind(this);
        this.addShirtText = this.addShirtText.bind(this);
        this.changeTextFont = this.changeTextFont.bind(this);

        this.state = {
            activeTab: '1',
            showConfirmation: false,
            shirtList: shirtList,
            shirtsInCart: [],
            openDesign: false,
            newTitle: 'untitled_design-1',
            selectedStyle: 'MensShirt-',
            selectedShirtColor: 'White',
            selectedGraphic: '',
            selectedGraphicColor: 'White',
            selectedTextColor: 'White',
            shirtText: '',
            fontStyle: "'Montserrat', sans-serif",
            graphicElement: null,
            textElement: null
        };
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if ((e.target.className !== 'overlay')) {
            return;
        }
        this.closeCart();
    }

    openCart = () => {
        console.log('Cart Open');
        this.refs.cart.style.width = "100%";
        this.refs.overlay.style.display = "block";

        document.addEventListener('click', this.handleOutsideClick, false);
    }

    closeCart = () => {
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
        });
        document.removeEventListener('click', this.handleOutsideClick, false);
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
            showConfirmation: true,
            shirtsInCart: []
        });
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
            showConfirmation: false,
        });
    }

    addToCart = (shirt) => {
        console.log('Add to Cart');
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        if (index !== -1) {
            // If shirt exists in cart, update its quantity in cart
            cartItems[index].quantity += 1;
        } else {
            // Update the shirt quantity and add it to cart
            shirt.quantity += 1;
            cartItems.push(shirt);
        }
        // Update the state with new list
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

    updateQuantity = (shirt) => {
        // Update the quantity from the input text box
        console.log('Update');
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        if (index !== -1) {
            cartItems[index].quantity = shirt.quantity;
        }
        this.setState({
            shirtsInCart: cartItems
        });
    }

    openShirtDesign = () => {
        this.setState({
            openDesign: !this.state.openDesign
        });
    }

    setShirtTitle = (event) => {
        this.setState({
            newTitle: event.target.value
        });
    }

    setShirtTitle = (event) => {
        this.setState({
            newTitle: event.target.value
        });
    }

    saveShirtDesign = () => {
        console.log('Shirt Save');
        let list = this.state.shirtList;
        let newShirt = {
            id: shirtList.length + 1,
            name: this.state.newTitle,
            description: '',
            price: 18.99,
            quantity: 0,
            image: this.state.selectedStyle + this.state.selectedShirtColor.toLowerCase() + '.jpg',
            graphic: this.state.selectedGraphic,
            text: this.state.shirtText,
            textColor: this.state.selectedTextColor,
            font: this.state.fontStyle,
            graphicElementPosition: { top: this.state.graphicElement.style.top, left: this.state.graphicElement.style.left },
            textElementPosition: { top: this.state.textElement.style.top, left: this.state.textElement.style.left },
        };

        list.push(newShirt);
        this.setState({
            shirtList: list
        });
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

    selectGraphic = (graphic, element) => {
        this.setState({
            selectedGraphic: graphic,
            graphicElement: element
        });
    }

    addShirtText = (text, element) => {
        this.setState({
            shirtText: text,
            textElement: element
        })
    }

    changeTextFont = (font) => {
        this.setState({ fontStyle: font });
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
                        {this.state.openDesign ? <input className="input-shirt-title" type="text" value={this.state.newTitle} onChange={this.setShirtTitle} /> : null}
                        <button className="primary-btn nav-btn" onClick={() => { this.openShirtDesign(); }}>{this.state.openDesign ? 'SAVE DESIGN' : 'NEW DESIGN'}</button>
                        <div className="vr"></div>
                        <Row className="cart-btn" onClick={() => { this.openCart(); }}>
                            <div className="nav-icon-basket"></div>
                            <div className="cart-count">{this.state.shirtsInCart.length}</div>
                        </Row>
                    </Row>
                </Navbar>
                <div>
                    <div className="overlay" ref="overlay"></div>
                    {this.state.openDesign ? <Design saveShirtDesign={this.saveShirtDesign} shirtDesign={{
                        selectedStyle: this.state.selectedStyle,
                        selectedShirtColor: this.state.selectedShirtColor,
                        selectedGraphic: this.state.selectedGraphic,
                        selectedGraphicColor: this.state.selectedGraphicColor,
                        selectedTextColor: this.state.selectedTextColor,
                        shirtText: this.state.shirtText,
                        fontStyle: this.state.fontStyle
                    }} selectStyle={this.selectStyle} selectColor={this.selectColor} selectGraphic={this.selectGraphic} addShirtText={this.addShirtText} changeTextFont={this.changeTextFont} /> : <CatalogTabs shirtList={this.state.shirtList} addToCart={this.addToCart} />}
                </div>
            </div>
        );
    }
}

export default Catalog;