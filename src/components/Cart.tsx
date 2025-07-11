import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./UI/CartItem";
export default function Cart() {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + Number(item.price) * item.quantity, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }   

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart'? handleCloseCart : undefined}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) =>
                     <CartItem 
                     key={item.id}
                      {...item} 
                      onIncrease={() => cartCtx.addItem(item)} 
                      onDecrease={() => cartCtx.removeItem(item.id)}
                       />)
                     }
            </ul>
            <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
            <p className="modal-actions">
                <Button className="" textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button className="" onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}