package javaProject;

import javaProject.forms.MainMenu; 
public class Main {
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(() -> {
            new MainMenu().setVisible(true);
        });
    }
}
