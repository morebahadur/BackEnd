import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class update {
    public static void main(String[] args) {
        try {
            String email1 = "garima@gmail.com";
            String city = "pune";
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_db", "root", "hello");
            PreparedStatement ps = con.prepareStatement("update register set city=? where email=?");
            ps.setString(1, city);
            ps.setString(2, email1);
            int count = ps.executeUpdate();
            if (count > 0) {
                System.out.println("successfull!");
            } else {
                System.out.println("failed!");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
