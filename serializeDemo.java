import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class Employee implements Serializable {
    public String name;
    public String address;
    public int ssn;
    public int number;

    public void mailCheck() {
        System.out.println("Mailing a check to " + name + " at " + address);
    }
}

public class serializeDemo {
    public static void main(String[] args) {
        Employee e = new Employee();
        e.name = "John Doe";
        e.address = "123 Main St";
        e.ssn = 123111;
        e.number = 123456789;
        try {
            FileOutputStream fileout = new FileOutputStream("employee.ser");
            ObjectOutputStream out = new ObjectOutputStream(fileout);
            out.writeObject(e);
            out.close();
            fileout.close();
            System.out.println("Serialized data is saved in employee.ser");
        } catch (IOException i) {
            i.printStackTrace();
        }
    }
}
