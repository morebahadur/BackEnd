package javaProject.forms;

import java.awt.BorderLayout;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSpinner;
import javax.swing.JTable;
import javax.swing.SpinnerDateModel;
import javax.swing.table.DefaultTableModel;

import javaProject.DBConnection;

public class MarkAttendanceForm extends JFrame {
    private JTable table;
    private DefaultTableModel model;
    private JSpinner datePicker;

    public MarkAttendanceForm() {
        setTitle("Mark Attendance");
        setSize(600, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // Date picker panel
        JPanel top = new JPanel();
        SpinnerDateModel dateModel = new SpinnerDateModel(
                Calendar.getInstance().getTime(),
                null,
                null,
                Calendar.DAY_OF_MONTH);
        datePicker = new JSpinner(dateModel);
        JSpinner.DateEditor dateEditor = new JSpinner.DateEditor(datePicker, "yyyy-MM-dd");
        datePicker.setEditor(dateEditor);
        top.add(new JLabel("Select Date:"));
        top.add(datePicker);
        add(top, BorderLayout.NORTH);

        // Table setup
        model = new DefaultTableModel(new Object[] { "ID", "Name", "Present" }, 0) {
            @Override
            public Class<?> getColumnClass(int columnIndex) {
                return columnIndex == 2 ? Boolean.class : Object.class;
            }
        };
        table = new JTable(model);
        add(new JScrollPane(table), BorderLayout.CENTER);

        // Button panel
        JPanel bottom = new JPanel();
        JButton btnLoad = new JButton("Load Students");
        JButton btnSave = new JButton("Save Attendance");
        btnLoad.addActionListener(e -> loadStudents());
        btnSave.addActionListener(e -> saveAttendance());
        bottom.add(btnLoad);
        bottom.add(btnSave);
        add(bottom, BorderLayout.SOUTH);
    }

    private void loadStudents() {
        model.setRowCount(0);
        try (Connection conn = DBConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT student_id, name FROM students")) {

            while (rs.next()) {
                model.addRow(new Object[] {
                        rs.getInt("student_id"),
                        rs.getString("name"),
                        false
                });
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error loading students: " + ex.getMessage());
            ex.printStackTrace();
        }
    }

    private void saveAttendance() {
        // Convert JSpinner date to LocalDate
        java.util.Date date = (java.util.Date) datePicker.getValue();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false); // Start transaction

            // Validate data before proceeding
            if (model.getRowCount() == 0) {
                JOptionPane.showMessageDialog(this, "No students loaded. Please load students first.");
                return;
            }

            // First check if attendance already exists for this date
            String checkSql = "SELECT COUNT(*) FROM attendance WHERE date = ?";
            try (PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
                checkStmt.setDate(1, Date.valueOf(localDate));
                ResultSet rs = checkStmt.executeQuery();
                if (rs.next() && rs.getInt(1) > 0) {
                    int option = JOptionPane.showConfirmDialog(this,
                            "Attendance for this date already exists. Do you want to update it?",
                            "Duplicate Entry",
                            JOptionPane.YES_NO_OPTION);
                    if (option != JOptionPane.YES_OPTION) {
                        return;
                    }
                    // Delete existing attendance for this date
                    String deleteSql = "DELETE FROM attendance WHERE date = ?";
                    try (PreparedStatement deleteStmt = conn.prepareStatement(deleteSql)) {
                        deleteStmt.setDate(1, Date.valueOf(localDate));
                        int rowsDeleted = deleteStmt.executeUpdate();
                        System.out.println("Deleted " + rowsDeleted + " existing attendance records");
                    }
                }
            }

            // Insert new attendance
            String sql = "INSERT INTO attendance(student_id, date, status) VALUES(?, ?, ?)";
            int successCount = 0;
            try (PreparedStatement pst = conn.prepareStatement(sql)) {
                for (int i = 0; i < model.getRowCount(); i++) {
                    int id = ((Number) model.getValueAt(i, 0)).intValue();
                    boolean present = (Boolean) model.getValueAt(i, 2);
                    pst.setInt(1, id);
                    pst.setDate(2, Date.valueOf(localDate));
                    pst.setString(3, present ? "Present" : "Absent");
                    pst.addBatch();
                    successCount++;
                }
                pst.executeBatch();
            }

            conn.commit(); // Commit transaction
            JOptionPane.showMessageDialog(this,
                    String.format("Attendance saved successfully! Processed %d records.", successCount));
            dispose();

        } catch (Exception ex) {
            try {
                if (conn != null) {
                    conn.rollback(); // Rollback transaction on error
                }
            } catch (Exception rollbackEx) {
                System.err.println("Error rolling back transaction: " + rollbackEx.getMessage());
            }

            String errorMessage;
            if (ex.toString().contains("com.mysql.cj.jdbc.Driver")) {
                errorMessage = "Database connection error. Please check if MySQL is running.";
            } else if (ex.toString().contains("Duplicate entry")) {
                errorMessage = "Duplicate attendance record found. Please try again.";
            } else {
                errorMessage = "Error saving attendance: " + ex.getMessage();
            }

            JOptionPane.showMessageDialog(this,
                    errorMessage,
                    "Error",
                    JOptionPane.ERROR_MESSAGE);
            ex.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.setAutoCommit(true); // Reset auto-commit
                    conn.close();
                }
            } catch (Exception e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
}