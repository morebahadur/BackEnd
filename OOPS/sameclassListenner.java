import java.awt.*;
import java.awt.event.*;

public class sameclassListenner implements ActionListener {
    Frame f;
    Button b,b1;
    TextField tf;
    sameclassListenner(String s){
        f = new Frame(s);
        b = new Button("okay");
        b1 = new Button("cancel");
        b.setBounds(10, 200, 90, 90);
        b1.setBounds(150, 200, 90, 90);
        b.addActionListener(this);
        b1.addActionListener(this);
        f.add(b);
        f.add(b1);
        tf = new TextField();
        tf.setBounds(20, 50, 100, 50);
        f.add(tf);
        f.setSize(400, 400);
        f.setLayout(null);
        f.setVisible(true);

    }

    public static void main(String[] args) {
        new sameclassListenner("same class listener");
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource() == b){
            tf.setText("okay");
        }
        if(e.getSource() == b1){
            tf.setText("cancel");
        }
    }
}