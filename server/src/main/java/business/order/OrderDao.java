package business.order;

import java.sql.Connection;
import java.util.List;

public interface OrderDao {

    public long create(Connection connection, Double amount, int confirmationNumber, Long customerId);

    public void commitTransaction(Connection connection);

    public void rollbackTransaction(Connection connection);

    public List<Order> findAll();

    public Order findByOrderId(long orderId);

    public List<Order> findByCustomerId(long customerId);
}
