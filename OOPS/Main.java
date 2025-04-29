import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

class DigitalClock extends Thread {
    public void run() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        System.out.println("Digital Clock Started:");

        for (int i = 0; i < 5; i++) {
            LocalTime currentTime = LocalTime.now();
            System.out.println(currentTime.format(formatter));
            try {
                Thread.sleep(1000); // sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println("Clock interrupted!");
            }
        }

        System.out.println("Digital Clock Stopped.");
    }
}

public class Main {
    public static void main(String[] args) {
        DigitalClock clock = new DigitalClock(); // creating thread object
        clock.start(); // starting the thread
    }
}
