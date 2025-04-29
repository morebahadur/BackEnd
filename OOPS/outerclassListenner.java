import java.awt.Button;
import java.awt.Frame;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class outerclassListenner implements ActionListener {
    Frame f;
    Button b, b1;
    TextField tf;

    outerclassListenner(String s) {
        f = new Frame(s);
        b = new Button("okay");
        b1 = new Button("cancel");
        outer o = new outer(this);
        b.addActionListener(o);
        b1.addActionListener(o);
        b.setBounds(20, 120, 80, 30);
        b1.setBounds(150, 120, 80, 30);
        f.add(b);
        f.add(b1);
        tf = new TextField();
        tf.setBounds(20, 40, 150, 30);
        f.add(tf);
        f.setSize(400, 400);
        f.setLayout(null);
        f.setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == b) {
            tf.setText("okay");
        }
        if (e.getSource() == b1) {
            tf.setText("cancel");
        }
        f.dispose();
    }

    public static void main(String[] args) {
        new outerclassListenner("first app");
    }

}

class outer implements ActionListener {
    outerclassListenner f;

    outer(outerclassListenner f) {
        this.f = f;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == f.b) {
            f.tf.setText("okay outer");
        }
        if (e.getSource() == f.b1) {
            f.tf.setText("cancel outer");
        }
    }
}