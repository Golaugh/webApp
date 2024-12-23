import { useContext } from 'react';
import { OrderDetailsStore } from '../contexts/OrderDetailContext';
import { asDollarsAndCents } from '../utils';

function ConfirmationTable() {
    const { orderDetails } = useContext(OrderDetailsStore);

    if (!orderDetails) return null;

    const calculateSubtotal = () => {
        return orderDetails.books.reduce((total, book) => {
            const quantity = orderDetails.lineItems.find(item => item.bookId === book.bookId)?.quantity || 0;
            return total + (book.price * quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return (
        <div className="order-summary">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Quantity</th>
                        <th className="price-column">Price</th>
                        <th className="price-column">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.books.map((book) => {
                        const quantity = orderDetails.lineItems.find(
                            item => item.bookId === book.bookId
                        )?.quantity || 0;
                        return (
                            <tr key={book.bookId}>
                                <td>{book.title}</td>
                                <td className="center-align">{quantity}</td>
                                <td className="price-column">{asDollarsAndCents(book.price * 100)}</td>
                                <td className="price-column">{asDollarsAndCents(book.price * quantity * 100)}</td>
                            </tr>
                        );
                    })}
                    <tr className="subtotal-row">
                        <td colSpan={3}>Subtotal</td>
                        <td className="price-column">{asDollarsAndCents(subtotal * 100)}</td>
                    </tr>
                    <tr className="tax-row">
                        <td colSpan={3}>Tax (8%)</td>
                        <td className="price-column">{asDollarsAndCents(tax * 100)}</td>
                    </tr>
                    <tr className="total-row">
                        <td colSpan={3}><strong>Total</strong></td>
                        <td className="price-column"><strong>{asDollarsAndCents(total * 100)}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ConfirmationTable;