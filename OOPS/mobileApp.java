// class bookTheaterSeat {
//     static int totalSeats = 35;

//     static synchronized  void bookSeat(int seats) {

//         // this synchronized block is used to lock the object for any shared resource
//         // which is used by multiple threads which increase execution time of the thread
//         if (totalSeats > seats) {
//             totalSeats = totalSeats - seats;
//             System.out.println("Seats booked: " + seats + ", Remaining seats: " + totalSeats);
//         } else {
//             System.out.println("Sorry, not enough seats available. Remaining seats: " + totalSeats);
//         }

//     }
// }

// class mythread1 extends Thread {
//     bookTheaterSeat b;
//     int seats;

//     mythread1(bookTheaterSeat b, int seats) {
//         this.b = b;
//         this.seats = seats;
//     }

//     public void run() {
//         b.bookSeat(seats);
//     }
// }

// class mythread2 extends Thread {
//     bookTheaterSeat b;
//     int seats;

//     mythread2(bookTheaterSeat b, int seats) {
//         this.b = b;
//         this.seats = seats;
//     }

//     public void run() {
//         b.bookSeat(seats);
//     }
// }

// class mobileApp extends Thread {
//     static bookTheaterSeat b;
//     int seats;

//     public void run() {
//         b.bookSeat(seats);
//     }

//     public static void main(String[] args) {
//         bookTheaterSeat b = new bookTheaterSeat();
//         mythread1 t1 = new mythread1(b, 5);
//         t1.start();
//         mythread2 t2 = new mythread2(b, 10);
//         t2.start();

//         bookTheaterSeat b2 = new bookTheaterSeat();
//         mythread1 t3 = new mythread1(b2, 13);
//         t3.start();
//         mythread2 t4 = new mythread2(b2, 10);
//         t4.start();
//     }
// }

