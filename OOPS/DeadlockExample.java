public class DeadlockExample {

    // Define two resources
    static class Paper {
    }

    static class Pen {
    }

    // Thread 1 tries to lock Paper then Pen
    static class Thread1 extends Thread {
        private final Paper paper;
        private final Pen pen;

        public Thread1(Paper paper, Pen pen) {
            this.paper = paper;
            this.pen = pen;
        }

        @Override
        public void run() {
            synchronized (paper) {
                System.out.println("Thread 1: Holding paper...");

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }

                System.out.println("Thread 1: Waiting for pen...");
                synchronized (pen) {
                    System.out.println("Thread 1: Writing with paper and pen");
                }
            }
        }
    }

    // Thread 2 tries to lock Pen then Paper
    static class Thread2 extends Thread {
        private final Paper paper;
        private final Pen pen;

        public Thread2(Paper paper, Pen pen) {
            this.paper = paper;
            this.pen = pen;
        }

        @Override
        public void run() {
            synchronized (pen) {
                System.out.println("Thread 2: Holding pen...");

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }

                System.out.println("Thread 2: Waiting for paper...");
                synchronized (paper) {
                    System.out.println("Thread 2: Writing with paper and pen");
                }
            }
        }
    }

    public static void main(String[] args) {
        Paper paper = new Paper();
        Pen pen = new Pen();

        // Create two threads that cause deadlock
        Thread1 t1 = new Thread1(paper, pen);
        Thread2 t2 = new Thread2(paper, pen);

        t1.start();
        t2.start();
    }
}
