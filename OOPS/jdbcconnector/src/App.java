import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class App {
    public static void main(String[] args) {
        try {
            // Load the JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Dabase Connection
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_db", "root", "hello");
            // PreparedStatement ps = con.prepareStatement("INSERT INTO register
            // Values('pritika','pritika@gmail.com','pritika1234', 'female', 'kathmandu')");
            PreparedStatement ps = con.prepareStatement("INSERT INTO register Values(?,?,?,?,?)");
            ps.setString(1, "garima");
            ps.setString(2, "garima@gmail.com");
            ps.setString(3, "garima123");
            ps.setString(4, "female");
            ps.setString(5, "kathmandu");
            int i = ps.executeUpdate();
            if (i > 0) {
                System.out.println("successfull");
            } else {
                System.out.println("fail");
            }

        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver not found: " + e.getMessage());
        } catch (SQLException es) {
            System.out.println("DataBase connection error: " + es.getMessage());
        }
    }
}
