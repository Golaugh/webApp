package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Calendar;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) { this.bookDao = bookDao; }
	public void setOrderDao(OrderDao orderDao) { this.orderDao = orderDao; }
	public void setLineItemDao(LineItemDao lineItemDao) { this.lineItemDao = lineItemDao; }
	public void setCustomerDao(CustomerDao customerDao) { this.customerDao = customerDao; }

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT
		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = customerForm.getCcExpiryDate();
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
    	if (name == null || name.equals("") || name.length() < 4 || name.length() > 45) {
        throw new ApiException.ValidationFailure("name", "Name must be between 4 and 45 characters");
    	}

		// TODO: Validation checks for address, phone, email, ccNumber

		// Address validation
		String address = customerForm.getAddress();
		if (address == null || address.equals("") || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Address must be between 4 and 45 characters");
		}

		// Phone validation
		String phone = customerForm.getPhone();
		if (phone == null || phone.equals("")) {
			throw new ApiException.ValidationFailure("phone", "Phone number is required");
		}
		String cleanPhone = phone.replaceAll("[\\s\\-()]", "");
		if (!cleanPhone.matches("\\d{10}")) {
			throw new ApiException.ValidationFailure("phone", "Phone must contain exactly 10 digits");
		}

		// Email validation
		String email = customerForm.getEmail();
		if (email == null || email.equals("")) {
			throw new ApiException.ValidationFailure("email", "Email is required");
		}
		if (email.contains(" ") || !email.contains("@") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email", "Invalid email format");
		}

		// Credit card validation
		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.equals("")) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number is required");
		}
		String cleanCCNumber = ccNumber.replaceAll("[\\s\\-]", "");
		if (cleanCCNumber.length() < 14 || cleanCCNumber.length() > 16 || !cleanCCNumber.matches("\\d+")) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number must be between 14 and 16 digits");
		}

		// Expiry date validation
		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		try {
        int month = Integer.parseInt(ccExpiryMonth);
        int year = Integer.parseInt(ccExpiryYear);
        
        YearMonth cardExpiry = YearMonth.of(year, month);
        YearMonth currentDate = YearMonth.now();
        
        return cardExpiry.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {

			// Quantity validation
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Quantity must be between 1 and 99");
			}

			// Validate book exists and matches database
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Invalid book in cart");
			}
			// TODO: complete the required validations
			// Price validation
			double cartPrice = item.getBookForm().getPrice();
			double dbPrice = databaseBook.price();
			if (Math.abs(dbPrice - cartPrice) > 1) { // Allow a small tolerance
				throw new ApiException.ValidationFailure("Cart price does not match database price, detail: " + "Comparing prices - Cart price: " + cartPrice + ", Database price: " + dbPrice);
			}

			// Category validation
			if (databaseBook.categoryId() != item.getBookForm().getCategoryId()) {
				throw new ApiException.ValidationFailure("Cart category does not match database category");
			}
		});
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			Double totalAmount = cart.getComputedSubtotal() + cart.getSurcharge();
			long customerOrderId = orderDao.create(
					connection,
					totalAmount,
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
								   item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

}
