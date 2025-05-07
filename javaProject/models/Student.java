// File: models/Student.java
package javaProject.models;
public class Student {
    private int id;
    private String name;
    private String rollNo;
    private String course;
    private int year;

    public Student(int id, String name, String rollNo, String course, int year) {
        this.id = id;
        this.name = name;
        this.rollNo = rollNo;
        this.course = course;
        this.year = year;
    }

    // getters and setters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getRollNo() { return rollNo; }
    public String getCourse() { return course; }
    public int getYear() { return year; }
}