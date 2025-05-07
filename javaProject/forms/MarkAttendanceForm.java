package javaProject.forms;

import java.awt.BorderLayout;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
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

        // Date picker using JSpinner
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

        // ...existing code for buttons and table...
    }

    private void saveAttendance() {
        // Convert JSpinner date to LocalDate
        java.util.Date date = (java.util.Date) datePicker.getValue();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO attendance(student_id, date, status) VALUES(?, ?, ?)";
            PreparedStatement pst = conn.prepareStatement(sql);
            for (int i = 0; i < model.getRowCount(); i++) {
                int id = ((Number) model.getValueAt(i, 0)).intValue();
                boolean present = (Boolean) model.getValueAt(i, 2);
                pst.setInt(1, id);
                pst.setDate(2, Date.valueOf(localDate));
                pst.setString(3, present ? "Present" : "Absent");
                pst.addBatch();
            }
            pst.executeBatch();
            JOptionPane.showMessageDialog(this, "Attendance saved!");
            dispose();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error saving attendance: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}