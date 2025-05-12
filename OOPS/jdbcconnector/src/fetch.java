import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class fetch {
    public static void main(String[] args) throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_db", "root", "hello");
        PreparedStatement ps = con.prepareStatement("select * from register");
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            String name = rs.getString("name");
            String email = rs.getString("email");
            String password = rs.getString("password");
            String gender = rs.getString("gender");
            String city = rs.getString("city");
            System.out.println(name + ", " + email + ", " + password + ", " + gender + ", " + city);
        }
        con.close();
    }
}
