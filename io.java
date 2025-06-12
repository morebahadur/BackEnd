import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class io {
    public static void main(String[] args) throws IOException {

        FileReader in = new FileReader("input.txt");
        FileWriter out = new FileWriter("output.txt");
        try {
            int c;
            while ((c = in.read()) != -1) {
                out.write(c);
            }
        } finally {
            if (in != null) {
                in.close();
            }
            if (out != null) {
                out.close();
            }
        }
    }
}
