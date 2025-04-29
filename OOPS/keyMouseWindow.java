import java.awt.Button;
import java.awt.Color;
import java.awt.Frame;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import org.w3c.dom.events.MouseEvent;

public class keyMouseWindow implements ActionListener {
    Frame f;
    Button b, b1;
    TextField tf;

    keyMouseWindow(String s) {
        f = new Frame(s);
        b = new Button("Okay");
        b1 = new Button("Cancel");
        b.addActionListener(this);
        b1.addActionListener(this);
        tf = new TextField();
        f.setLayout(null);
        b.setBounds(20, 100, 50, 30);
        b1.setBounds(120, 100, 50, 30);
        tf.addKeyListener(new KeyEventListener());
        tf.setBounds(20, 40, 200, 40);
        f.add(tf);

        f.add(b);
        f.add(b1);
        f.addWindowListener(new WindowEventListener());
        f.addMouseListener(new MouseEventListener(this));
        f.setSize(400, 400);
        f.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == b) {
            tf.setText("okay");
        }
        if (e.getSource() == b1) {
            tf.setText("cancel");
        }
    }

    public static void main(String[] args) {
        new keyMouseWindow("window handler");
    }
}

class WindowEventListener extends WindowAdapter {
    public void windowClosing(WindowEvent e1) {
        System.exit(0);
    }
}

class MouseEventListener extends MouseAdapter {
    keyMouseWindow t;

    MouseEventListener(keyMouseWindow f) {
        this.t = f;
    }

    public void mouseClicked(MouseEvent e1) {
        t.tf.setText("Mouse Event");
        t.f.setBackground(Color.black );
    }
}

class KeyEventListener extends KeyAdapter {
    public void keyTyped(KeyEvent e) {
        System.out.println(e.getKeyChar());
    }
}