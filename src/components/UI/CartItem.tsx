import { CartItemInterface } from "../../types/models"
interface CartItemProps extends CartItemInterface {
    onIncrease: () => void;
    onDecrease: () => void;
}   
export default function CartItem({name, price, quantity, onIncrease, onDecrease}: CartItemProps) {
    return (
        <li className="cart-item">
            <p>{name} - {quantity} x {price}</p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}