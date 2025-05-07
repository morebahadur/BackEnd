package javaProject.forms;

import java.awt.BorderLayout;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

// File: forms/AttendanceReportForm.java
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

import javaProject.DBConnection;

public class AttendanceReportForm extends JFrame {
    private JTable table;
    private DefaultTableModel model;

    public AttendanceReportForm() {
        setTitle("Attendance Report");
        setSize(700, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        model = new DefaultTableModel(new Object[] { "Student", "Date", "Status" }, 0);
        table = new JTable(model);
        add(new JScrollPane(table), BorderLayout.CENTER);

        JButton btnLoad = new JButton("Load Report");
        btnLoad.addActionListener(e -> loadReport());
        add(btnLoad, BorderLayout.SOUTH);
    }

    private void loadReport() {
        model.setRowCount(0);
        String query = "SELECT s.name, a.date, a.status FROM attendance a " +
                "JOIN students s ON a.student_id = s.student_id";
        try (Connection conn = DBConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                model.addRow(new Object[] {
                        rs.getString("name"),
                        rs.getDate("date"),
                        rs.getString("status")
                });
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}