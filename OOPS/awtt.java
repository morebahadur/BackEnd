import java.awt.*;
public class awtt extends Frame {
    awtt(String s, int i, int j){
        super(s);
        setSize(i, j);
        setVisible(true);
    }
    public static void main(String[] args) {
        new awtt("hello", 500, 500);
        new awtt("more", 500, 500);
    }
}
