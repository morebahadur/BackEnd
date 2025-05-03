import java.awt.Button;
import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class sum implements ActionListener {
    Frame f;
    Button b;
    TextField tf1, tf2, tf3;

    sum(String s) {
        f = new Frame(s);
        b = new Button("add");
        b.setBounds(20, 120, 80, 30);
        b.addActionListener(this);
        tf1 = new TextField();
        tf1.setBounds(20, 40, 150, 30);
        tf2 = new TextField();
        tf2.setBounds(20, 80, 150, 30);
        tf3 = new TextField();
        tf3.setBounds(20, 160, 150, 30);
        f.add(b);
        f.add(tf1);
        f.add(tf2);
        f.add(tf3);
        WindowClosing wc = new WindowClosing(f);
        f.addWindowListener(wc);
        f.setTitle("sum of two numbers");
        f.setSize(400, 400);
        f.setLayout(new FlowLayout());
        f.setVisible(true);

    }
    
    class WindowClosing implements java.awt.event.WindowListener {
        Frame frame;
    
        WindowClosing(Frame frame) {
            this.frame = frame;
        }
    
        public void windowClosing(java.awt.event.WindowEvent e) {
            frame.dispose();
        }
    
        public void windowOpened(java.awt.event.WindowEvent e) {}
        public void windowClosed(java.awt.event.WindowEvent e) {}
        public void windowIconified(java.awt.event.WindowEvent e) {}
        public void windowDeiconified(java.awt.event.WindowEvent e) {}
        public void windowActivated(java.awt.event.WindowEvent e) {}
        public void windowDeactivated(java.awt.event.WindowEvent e) {}
    }

    public void actionPerformed(ActionEvent e) {
        int num1 = Integer.parseInt(tf1.getText());
        int num2 = Integer.parseInt(tf2.getText());
        int sum = num1 + num2;
        tf3.setText(String.valueOf(sum));
    }
    
    public static void main(String[] args) {
        new sum("first app");
    }
}