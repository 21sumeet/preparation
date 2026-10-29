// //java queue implmentation using arraylist
// import java.util.ArrayList;
// class Queue {
//     private ArrayList<Integer> items;
    
//     // Constructor
//     public Queue() {
//         this.items = new ArrayList<>();
//     }
    
//     // Add element to the back (enqueue)
//     public void enqueue(int element) {
//         items.add(element);           // add to end
//     }
    
//     // Remove and return front element (dequeue)
//     public int dequeue() {
//         if (isEmpty()) {
//             throw new RuntimeException("Queue is empty");
//         }
//         return items.remove(0);       // remove from front
//     }
    
//     // Return front element without removing
//     public int peek() {
//         if (isEmpty()) {
//             throw new RuntimeException("Queue is empty");
//         }
//         return items.get(0);          // first element
//     }
    
//     // Check if empty
//     public boolean isEmpty() {
//         return items.isEmpty();
//     }
    
//     // Return size
//     public int size() {
//         return items.size();
//     }
    
//     // Print queue contents
//     public void print() {
//         System.out.println(items.toString());
//     }
// }

// public class Main {
//     public static void main(String[] args) {
//         Queue queue = new Queue();
        
//         System.out.println(queue.isEmpty());  // true
//         queue.enqueue(20);
//         queue.enqueue(10);
//         queue.enqueue(30);
//         System.out.println(queue.size());     // 3
//         queue.print();                        // [20, 10, 30]
//         System.out.println(queue.dequeue());  // 20
//         System.out.println(queue.peek());     // 10
//         queue.print();                        // [10, 30]
//     }
// }


//javascript queue implementation
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    if (!this.isEmpty()) {
      return this.items[0];
    }
    return null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }
}

const queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.size());
queue.print();
console.log(queue.dequeue());
console.log(queue.peek());
queue.print();
