import java.io.IOException;
import java.io.InputStreamReader;

public class readingCharacter {
    public static void main(String[] args) throws IOException {
        InputStreamReader cin = new InputStreamReader(System.in);
        try {
            System.out.println("Enter characters, 'q' to quit:");
            char c;
            do {
                c = (char) cin.read();
                System.out.print(c);
            } while (c != 'q');
        } finally {
            if (cin != null) {

                cin.close();

            }
        }
    }
}
