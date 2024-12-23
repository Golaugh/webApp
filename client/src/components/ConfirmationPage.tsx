import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailContext";


function ConfirmationPage()
{
    const { orderDetails} = useContext(OrderDetailsStore);

    if (!orderDetails) return <div>No order details found</div>;

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    const formatCreditCard = (ccNumber: string) => {
        return `**** **** **** ${ccNumber.slice(-4)}`;
    };

    const formatExpiryDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return(
        <div className="confirmation-container">
            <h2>Order Confirmation</h2>
            <div className="confirmation-details">
                <p>Confirmation #: {orderDetails.order.confirmationNumber}</p>
                <p>Order Date: {formatDate(orderDetails.order.dateCreated)}</p>
            </div>

            <ConfirmationTable />

            <div className="customer-details">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {orderDetails.customer.customerName}</p>
                <p><strong>Email:</strong> {orderDetails.customer.email}</p>
                <p><strong>Address:</strong> {orderDetails.customer.address}</p>
                <p><strong>Phone:</strong> {orderDetails.customer.phone}</p>
                <p><strong>Payment:</strong> {formatCreditCard(orderDetails.customer.ccNumber)}</p>
                <p><strong>Expires:</strong> {formatExpiryDate(orderDetails.customer.ccExpDate)}</p>
            </div>
        </div>
    )
}
export default ConfirmationPage;