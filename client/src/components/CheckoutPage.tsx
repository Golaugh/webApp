import  "../assets/css/Checkout.css"

import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import {OrderDetailsStore} from "../contexts/OrderDetailContext";


function CheckoutPage()
{

   const getBookImageUrl = function (book: BookItem): string {
      let filename = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
      return `${filename}.jpg`;
   };

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const TAX_RATE = 0.1; // Example tax rate of 10%
   const {cart, dispatch} = useContext(CartStore);
   const { dispatch: dispatchOrderDetails } = useContext(OrderDetailsStore); // Get the dispatch function
   const navigate = useNavigate();

   let cartTotalPrice; // TO DO code that calculates the total price of your cart
   cartTotalPrice = cart.length === 0 ? 0 : cart.reduce((sum, i) => sum + (i.book.price * i.quantity), 0);

   const subtotal = cartTotalPrice;
   const tax = subtotal * TAX_RATE;
   const total = subtotal + tax;

   let cartQuantity; // TO DO the code that calculates the total number of items in your cart
   cartQuantity = cart.length === 0 ? 0 : cart.reduce((sum, i) => sum + i.quantity, 0);

   const latestBookId = localStorage.getItem("latestBookId");
   let finalState;
   if (cartQuantity === 0) {
      finalState=(
          <div className="total-amount">
             The cart is empty!
             <p className="empty-continue">
                <Link to={`/categories/${latestBookId}`}>Continue Shopping!</Link>
             </p>
          </div>
      );
   } else { // @ts-ignore
      finalState=`The current amount is $${cartTotalPrice.toFixed(2)}.`;
   }

   const [nameError, setNameError] = useState("");

   // TO DO error states for the rest of the input elements
   const [checkoutStatus, setCheckoutStatus] = useState("");

   const [formData, setFormData] = useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: "",
      ccExpiryMonth: 0,
      ccExpiryYear: 0
  });

  const [errors, setErrors] = useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: ""
  });

   // TO DO placeOrder function comes here. Needed for project 9 (not 8)

   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

      const { name, value } = event.target;

      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        switch (name) {
            case 'name':
            case 'address':
                if (value.length < 4 || value.length > 45) {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must be between 4 and 45 characters.` }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
                }
                break;
            case 'phone':
                if (!isMobilePhone(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, phone: "Invalid phone number." }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
                }
                break;
            case 'email':
                if (!isvalidEmail(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address." }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                }
                break;
            case 'ccNumber':
                if (!isCreditCard(value)) {
                    setErrors((prevErrors) => ({ ...prevErrors, ccNumber: "Invalid credit card number." }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, ccNumber: "" }));
                }
                break;
            default:
                break;
      }
   }

   function isValidForm()
   {
       //TO DO code that returns true is the customer form is valid, false otherwise
      return Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((field) => field !== "");
   }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };
        const orders = JSON.stringify(order);
        console.log(orders);
        const url = 'http://localhost:8080/JianwenBookstoreReactTransact/api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order details: ", orderDetails);
        if (orderDetails) {
            dispatchOrderDetails({ type: 'UPDATE', payload: orderDetails }); // Dispatch to update order details
        }
        return orderDetails;
    }

  // TO DO submitOrder function comes here. See the project Spec
    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        const isFormCorrect =  isValidForm();
        console.log("Order validation: " + isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
            return;
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if (orders) {
                setCheckoutStatus("OK");
                dispatch({type: CartTypes.CLEAR});
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }

    const formRef = useRef<HTMLFormElement | null>(null);

//    function handleButtonClick() {
//        if (formRef.current) {
//           submitOrder(new Event('submit')); // Trigger the submitOrder function
//        }
//    }
    function handleButtonClick(event: FormEvent) {
        event.preventDefault(); 
        submitOrder(event);
}

   return (
       <section className="checkout-cart-table-view">
          <div className="checkout-page-body">
             <div>
                <form
                    className="checkout-form"
                    onSubmit ={submitOrder}
                    method="post"
                    ref={formRef}
                    >
                   <div className="submit-box">
                      <label htmlFor="fname">Name</label>
                      <input
                          className="checkout-input"
                          type="text"
                          size={20}
                          name="name"
                          id="fname"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                   </div>
                     {errors.name && <div className="error" style={{ textAlign: 'left' }}>{errors.name}</div>}


                   {/*<> {nameError && <div className="error"> {nameError}</div>}</>*/}

                    {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                    {/* Together with the error display*/}
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            className="checkout-input"
                            type="text"
                            size={20}
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                        <>{errors.address && <div className="error" style={{ textAlign: 'left' }}>{errors.address}</div>}</>


                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            className="checkout-input"
                            type="text"
                            size={20}
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                        <>{errors.phone && <div className="error" style={{ textAlign: 'left' }}>{errors.phone}</div>}</>


                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="checkout-input"
                            type="email"
                            size={20}
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                        <>{errors.email && <div className="error" style={{ textAlign: 'left' }}>{errors.email}</div>}</>


                    <div>
                        <label htmlFor="ccNumber">Card</label>
                        <input
                            className="checkout-input"
                            type="text"
                            size={20}
                            name="ccNumber"
                            id="ccNumber"
                            value={formData.ccNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                        <>{errors.ccNumber && <div className="error" style={{ textAlign: 'left' }}>{errors.ccNumber}</div>}</>


                    <div>
                        <label htmlFor="ccExpiryMonth">Exp Date</label>
                        <select
                            style={{color: 'black'}}
                            name="ccExpiryMonth"
                            value={formData.ccExpiryMonth}
                            onChange={handleInputChange}
                        >
                            {months.map((month, i) => (
                                <option key={i} value={i + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        {/*TO DO the select input for the expiration year. Read the spec */}
                        {/* about this*/}
                        <select
                            style={{color: 'black'}}
                            name="ccExpiryYear"
                            value={formData.ccExpiryYear}
                            onChange={handleInputChange}
                        >
                            {[2024, 2025, 2026, 2027, 2028, 2029].map((year, i) => (
                                <option key={i} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
             </div>

              {/* TO DO the checkout box with the total cost, tax) */}
              {/* and the Complete Purchase button comes here*/}
              <div className="checkout-summary checkout-form">
                  <div>Subtotal: ${subtotal.toFixed(2)}</div>
                  <div>Tax: ${tax.toFixed(2)}</div>
                  <div><strong>Total:</strong> ${total.toFixed(2)}</div>
                  <button
                      type="submit"
                      className="checkout-button"
                      onClick={handleButtonClick}
                      disabled={checkoutStatus === "PENDING"}
                  >
                      {checkoutStatus === "PENDING" ? "Processing..." : "Complete Purchase"}
                  </button>
              </div>


              <div>
                  {/*The following code displays different string based on the */}
                  {/*value of the checkoutStatus*/}
                  {/*Note the ternary operator*/}
                      {
                         checkoutStatus !== ''?
                             <>
                                <section className="checkoutStatusBox" >
                                   { (checkoutStatus === 'ERROR')?
                                       <div>
                                          Error: Please fix the problems above and try again.
                                       </div>: ( checkoutStatus === 'PENDING'?
                                           <div>
                                              Processing...
                                           </div> : (checkoutStatus === 'OK'?
                                               <div>
                                                  Order placed...
                                               </div>:
                                               <div>
                                                  An unexpected error occurred, please try again.
                                               </div>))}
                                </section>
                             </>
                             :<></>}
                   </div>
                </div>

          <div>
             {/*This displays the information about the items in the cart*/}
             <div className="total-amount">
                <h2>{finalState}</h2>
             </div>
             <ul className="checkout-cart-info">
                {
                   cart?.map((item, i) => (
                       <div className="checkout-cart-book-item" key={i}>
                          <div className="checkout-cart-book-image">
                             <img src={require('../assets/images/books/' + getBookImageUrl(item.book))} alt="title"
                                  className="checkout-cart-info-img"
                                  width="20%"
                                  height="20%"
                             />
                          </div>
                          <div className="checkout-cart-book-info">
                             <div className="checkout-cart-book-title">{item.book.title}</div>

                             <div className="checkout-cart-book-subtotal">
                                {/*TO DO the total cost of this specific book displayed here*/}
                             </div>
                             <div className="checkout-cart-book-quantity">
                                <button className="checkout-icon-button inc-button" onClick={() => {
                                   dispatch({type: CartTypes.ADD, book: item.book, id: item.book.bookId});
                                }}>
                                   <i className="fas fa-plus-circle"/>
                                </button>
                                <button className="checkout-num-button">{item.quantity}</button>
                                <button className="checkout-icon-button dec-button"
                                        onClick={() => {
                                           dispatch({type: CartTypes.REMOVE, book: item.book, id: item.book.bookId});
                                        }}
                                >
                                   <i className="fas fa-minus-circle"/>
                                </button>
                             </div>
                          </div>

                       </div>
                   ))}
             </ul>
          </div>
       </section>
   )
}

export default CheckoutPage;