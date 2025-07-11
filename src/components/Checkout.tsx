import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import Input from "./UI/Input";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('https://687199ec76a5723aacd25b6e.mockapi.io/orders', requestConfig);
    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleFinish() {
        userProgressCtx.hideCart();
        cartCtx.clearCart();
        clearData();
    }

        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const fd = new FormData(event.currentTarget);
        const customerData = Object.fromEntries(fd.entries());


        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
            },
        }));
    }

    if (data && !error) {
        return  <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order has been placed successfully!</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>
    }

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + Number(item.price) * item.quantity, 0);
    let actions = (<>
    <Button type="button" textOnly onClick={handleCloseCart}>Close</Button>
                    <Button>Submit Order</Button>
                    </>)
    if (isSending) {
        actions = <span>Sending order data...</span>
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: ${cartTotal.toFixed(2)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}
