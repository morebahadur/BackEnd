import java.awt.*;

public class one extends Frame {
    Frame f;
    one (String s){
        f = new Frame(s);
        f.setSize(500,500);
        f.setVisible(true);
    }
    public static void main(String[] args) {
        new one ("association");
        Frame f1 = new Frame("jjjjjaaaaaaaaaaa");
        f1.setSize(500,500);
        f1.setVisible(true);
    }
}
