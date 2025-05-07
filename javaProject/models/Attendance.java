package javaProject.models;

// File: models/Attendance.java
import java.time.LocalDate;

public class Attendance {
    private int id;
    private int studentId;
    private LocalDate date;
    private String status;

    public Attendance(int id, int studentId, LocalDate date, String status) {
        this.id = id;
        this.studentId = studentId;
        this.date = date;
        this.status = status;
    }

    // getters and setters
    public int getId() { return id; }
    public int getStudentId() { return studentId; }
    public LocalDate getDate() { return date; }
    public String getStatus() { return status; }
}
