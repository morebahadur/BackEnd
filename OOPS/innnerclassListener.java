import java.awt.Button;
import java.awt.Frame;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class innnerclassListener implements ActionListener {

    Frame f;
    Button b, b1;
    TextField tf;

    innnerclassListener(String s) {
        f = new Frame(s);
        b = new Button("Okay");
        b1 = new Button("cancel");
        b.addActionListener(this);
        b1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                tf.setText("innerListener Cancel");
            }
        }
            );
        b.setBounds(20, 80, 90, 50);
        b1.setBounds(150, 80, 90, 50);
        f.add(b);
        f.add(b1);
        tf = new TextField();
        tf.setBounds(20,40,200,40);
        f.add(tf);
        f.setSize(400,400);
        f.setLayout(null);
        f.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == b) {
            tf.setText("sameClassListener Okay");
        }
        if (e.getSource() == b1) {
            tf.setText("innerListener Cancel");
        }
    }

    public static void main(String[] args) {
        new innnerclassListener("Inner Listeners");
    }
}
