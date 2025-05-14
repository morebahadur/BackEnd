import java.util.Scanner;

public class simple {
    static public void trangle() {
        Scanner scanner = new Scanner(System.in);
        char ch = scanner.next().charAt(0);
        if (ch != '\n') {
            trangle();
        }
        System.out.println(ch);

    }

    public static void main(String[] args) {
        System.out.println("enter the sentence");
        trangle();
        return;
    }
}
