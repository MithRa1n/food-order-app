import Logo from "../assets/logo.jpg"
import { Button } from "./UI/Button"
import { CartContext } from "../store/CartContext"
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
export const Header = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
        return totalNumber + item.quantity;
    }, 0);
    return (
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt="Restourant"/>
                <h1>ReactFoods</h1>
            </div>
            <nav>
                <Button textOnly className="" onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}