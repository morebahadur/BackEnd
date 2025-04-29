import java.awt.Button;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Label;
import java.awt.TextField;
import java.awt.Toolkit;

public class two extends Frame {
    Frame f;
    Button b;
    Label l;
    TextField t;

    two(String s) {
        f = new Frame(s);
        l = new Label("Enter the number");
        l.setBounds(40, 40, 80, 20);
        f.add(l);
        t = new TextField();
        t.setBounds(100, 40, 100, 20);
        f.add(t);
        b = new Button("submit");
        b.setBounds(40, 50, 50, 50);
        f.add(b);
        Toolkit t = getToolkit();
        Dimension d = t.getScreenSize();
        int x = (d.width - 300) / 2;
        int y = (d.height - 300) / 2;
        // f.setLocation(x,y);
        // f.setSize(500,500);
        f.setBounds(x, y, 500, 500);
        f.setLayout(null);
        f.setVisible(true);
    }

    public static void main(String[] args) {
        new two("two");
    }
}