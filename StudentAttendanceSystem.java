import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.table.DefaultTableModel;

public class StudentAttendanceSystem extends JFrame {
    static ArrayList<Student> students = new ArrayList<>();
    static ArrayList<Attendance> attendanceRecords = new ArrayList<>();
    static final String STUDENT_FILE = "students.dat";
    static final String ATTENDANCE_FILE = "attendance.dat";

    public static void main(String[] args) {
        loadData();
        SwingUtilities.invokeLater(() -> new StudentAttendanceSystem().setVisible(true));
    }

    public StudentAttendanceSystem() {
        setTitle("Student Attendance System");
        setSize(400, 300);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JButton btnAddStudent = new JButton("Add Student");
        JButton btnMarkAttendance = new JButton("Mark Attendance");
        JButton btnViewReport = new JButton("View Report");

        btnAddStudent.addActionListener(e -> new AddStudentForm());
        btnMarkAttendance.addActionListener(e -> new MarkAttendanceForm());
        btnViewReport.addActionListener(e -> new AttendanceReportForm());

        setLayout(new GridLayout(3, 1, 10, 10));
        add(btnAddStudent);
        add(btnMarkAttendance);
        add(btnViewReport);
    }

    // --- Form: Add Student ---
    class AddStudentForm extends JFrame {
        AddStudentForm() {
            setTitle("Add Student");
            setSize(300, 250);
            setLocationRelativeTo(null);
            setLayout(new GridLayout(5, 2));

            JTextField nameField = new JTextField();
            JTextField rollField = new JTextField();
            JTextField courseField = new JTextField();
            JTextField yearField = new JTextField();

            JButton saveBtn = new JButton("Save");

            add(new JLabel("Name:"));
            add(nameField);
            add(new JLabel("Roll No:"));
            add(rollField);
            add(new JLabel("Course:"));
            add(courseField);
            add(new JLabel("Year:"));
            add(yearField);
            add(new JLabel(""));
            add(saveBtn);

            saveBtn.addActionListener(e -> {
                String name = nameField.getText().trim();
                String roll = rollField.getText().trim();
                String course = courseField.getText().trim();
                int year;
                try {
                    year = Integer.parseInt(yearField.getText().trim());
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(this, "Year must be a number.");
                    return;
                }

                students.add(new Student(name, roll, course, year));
                saveData();
                JOptionPane.showMessageDialog(this, "Student added.");
                dispose();
            });

            setVisible(true);
        }
    }

    // --- Form: Mark Attendance ---
    class MarkAttendanceForm extends JFrame {
        MarkAttendanceForm() {
            setTitle("Mark Attendance");
            setSize(400, 400);
            setLocationRelativeTo(null);
            setLayout(new BorderLayout());

            JPanel centerPanel = new JPanel(new GridLayout(students.size(), 2));
            Map<Student, JCheckBox> checkBoxes = new HashMap<>();

            for (Student s : students) {
                JCheckBox cb = new JCheckBox("Present");
                centerPanel.add(new JLabel(s.name));
                centerPanel.add(cb);
                checkBoxes.put(s, cb);
            }

            JButton saveBtn = new JButton("Save Attendance");
            add(centerPanel, BorderLayout.CENTER);
            add(saveBtn, BorderLayout.SOUTH);

            saveBtn.addActionListener(e -> {
                Date now = new Date();
                for (Map.Entry<Student, JCheckBox> entry : checkBoxes.entrySet()) {
                    attendanceRecords.add(new Attendance(entry.getKey().rollNo, now,
                            entry.getValue().isSelected() ? "Present" : "Absent"));
                }
                saveData();
                JOptionPane.showMessageDialog(this, "Attendance saved.");
                dispose();
            });

            setVisible(true);
        }
    }

    // --- Form: Attendance Report ---
    class AttendanceReportForm extends JFrame {
        AttendanceReportForm() {
            setTitle("Attendance Report");
            setSize(500, 400);
            setLocationRelativeTo(null);

            String[] columns = { "Name", "Roll No", "Date", "Status" };
            DefaultTableModel model = new DefaultTableModel(columns, 0);

            for (Attendance a : attendanceRecords) {
                Student s = findStudentByRoll(a.rollNo);
                if (s != null) {
                    model.addRow(new Object[] { s.name, a.rollNo, a.date.toString(), a.status });
                }
            }

            JTable table = new JTable(model);
            add(new JScrollPane(table));

            setVisible(true);
        }
    }

    // --- Model: Student ---
    static class Student implements Serializable {
        String name, rollNo, course;
        int year;

        Student(String name, String rollNo, String course, int year) {
            this.name = name;
            this.rollNo = rollNo;
            this.course = course;
            this.year = year;
        }
    }

    // --- Model: Attendance ---
    static class Attendance implements Serializable {
        String rollNo, status;
        Date date;

        Attendance(String rollNo, Date date, String status) {
            this.rollNo = rollNo;
            this.date = date;
            this.status = status;
        }
    }

    // --- Utility Methods ---
    static Student findStudentByRoll(String roll) {
        for (Student s : students) {
            if (s.rollNo.equals(roll))
                return s;
        }
        return null;
    }

    static void saveData() {
        try (ObjectOutputStream out1 = new ObjectOutputStream(new FileOutputStream(STUDENT_FILE));
                ObjectOutputStream out2 = new ObjectOutputStream(new FileOutputStream(ATTENDANCE_FILE))) {
            out1.writeObject(students);
            out2.writeObject(attendanceRecords);
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error saving data: " + e.getMessage());
        }
    }

    static void loadData() {
        try (ObjectInputStream in1 = new ObjectInputStream(new FileInputStream(STUDENT_FILE));
                ObjectInputStream in2 = new ObjectInputStream(new FileInputStream(ATTENDANCE_FILE))) {
            students = (ArrayList<Student>) in1.readObject();
            attendanceRecords = (ArrayList<Attendance>) in2.readObject();
        } catch (Exception e) {
            // Ignore on first run (no files yet)
            students = new ArrayList<>();
            attendanceRecords = new ArrayList<>();
        }
    }
}
