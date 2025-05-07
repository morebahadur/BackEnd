package javaProject.forms;

import java.awt.GridLayout;
import java.sql.Connection;
import java.sql.PreparedStatement;

// File: forms/AddStudentForm.java
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

import javaProject.DBConnection;

public class AddStudentForm extends JFrame {
    private JTextField nameField, rollField, courseField, yearField;

    public AddStudentForm() {
        setTitle("Add Student");
        setSize(350, 250);
        setLocationRelativeTo(null);
        setLayout(new GridLayout(5, 2, 5, 5));

        add(new JLabel("Name:"));
        nameField = new JTextField();
        add(nameField);
        add(new JLabel("Roll No:"));
        rollField = new JTextField();
        add(rollField);
        add(new JLabel("Course:"));
        courseField = new JTextField();
        add(courseField);
        add(new JLabel("Year:"));
        yearField = new JTextField();
        add(yearField);

        JButton btnSave = new JButton("Save");
        btnSave.addActionListener(e -> saveStudent());
        add(btnSave);
    }

    private void saveStudent() {
        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO students(name, roll_no, course, year) VALUES(?, ?, ?, ?)";
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, nameField.getText());
            pst.setString(2, rollField.getText());
            pst.setString(3, courseField.getText());
            pst.setInt(4, Integer.parseInt(yearField.getText()));
            pst.executeUpdate();
            JOptionPane.showMessageDialog(this, "Student added successfully!");
            dispose();
        } catch (Exception ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error: " + ex.getMessage());
        }
    }
}
