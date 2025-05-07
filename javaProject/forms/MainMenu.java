package javaProject.forms;

// File: forms/MainMenu.java
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

import javaProject.forms.AddStudentForm;
import javaProject.forms.AttendanceReportForm;
import javaProject.forms.MarkAttendanceForm;

public class MainMenu extends JFrame {
    public MainMenu() {
        setTitle("Attendance Management System");
        setSize(400, 300);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JButton btnAdd = new JButton("Add Student");
        JButton btnMark = new JButton("Mark Attendance");
        JButton btnReport = new JButton("View Report");

        btnAdd.addActionListener(e -> new AddStudentForm().setVisible(true));
        btnMark.addActionListener(e -> new MarkAttendanceForm().setVisible(true));
        btnReport.addActionListener(e -> new AttendanceReportForm().setVisible(true));

        JPanel panel = new JPanel();
        panel.add(btnAdd);
        panel.add(btnMark);
        panel.add(btnReport);
        add(panel);
    }
}