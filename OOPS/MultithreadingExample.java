
    class MyThread extends Thread {
        private String threadName;
    
        MyThread(String name) {
            this.threadName = name;
        }
    
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(threadName + " - Count: " + i);
                try {
                    Thread.sleep(500); // Pause for 500 milliseconds
                } catch (InterruptedException e) {
                    System.out.println(threadName + " interrupted.");
                }
            }
        }
    }
    
    public class MultithreadingExample {
        public static void main(String[] args) {
            MyThread thread1 = new MyThread("Thread 1");
            MyThread thread2 = new MyThread("Thread 2");
    
            thread1.start(); // Start first thread
            thread2.start(); // Start second thread
        }
    }
    

