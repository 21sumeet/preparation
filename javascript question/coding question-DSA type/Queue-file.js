// // 225. Implement Stack using Queues - java - 225
// import java.util.LinkedList;
// import java.util.Queue;

// class MyStack {
//     private Queue<Integer> queue1;
//     private Queue<Integer> queue2;
//     public MyStack() {
//         queue1 = new LinkedList<>();
//         queue2 = new LinkedList<>();
//     }

//     /** Push element x onto stack. */
//     public void push(int x) {
//         queue2.add(x); // Add the new element to queue2
//         // Move all elements from queue1 to queue2
//         while (!queue1.isEmpty()) {
//             queue2.add(queue1.remove());
//         }
//         // Swap the names of queue1 and queue2
//         Queue<Integer> temp = queue1;
//         queue1 = queue2;
//         queue2 = temp;
//     }

//     public int pop() {
//         if (!queue1.isEmpty()) {
//             return queue1.remove();
//         }
//         throw new IllegalStateException("Stack is empty");
//     }

//     public int top() {
//         if (!queue1.isEmpty()) {
//             return queue1.peek();
//         }
//         throw new IllegalStateException("Stack is empty");
//     }

//     public boolean empty() {
//         return queue1.isEmpty();
//     }
// }
class MyStack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }
    push(x) {
        // Add new element to queue2
        this.queue2.push(x);
        // Move all elements from queue1 to queue2
        while(this.queue1.length > 0) {
            this.queue2.push(this.queue1.shift());
        }
        // Swap queue1 and queue2
        const temp = this.queue1;
        this.queue1 = this.queue2;
        this.queue2 = temp;
    }
    pop() {
        if(this.queue1.length > 0) {
            return this.queue1.shift();  // dequeue from front
        }
        throw new Error("Stack is empty");
    }
    top() {
        if(this.queue1.length > 0) {
            return this.queue1[0];  // peek front
        }
        throw new Error("Stack is empty");
    }
    empty() {
        return this.queue1.length === 0;
    }
}


// // 641. Design Circular Deque - java - 641
// class MyCircularDeque {
//     private int[] v;
//     private int front, back, size, capacity;
//     public MyCircularDeque(int k) {
//         v = new int[k];
//         Arrays.fill(v, -1); // Initialize the deque with -1
//         front = 0;
//         back = 0;
//         size = 0; // Keeps track of the current number of elements
//         capacity = k;
//     }
//     public boolean insertFront(int value) {
//         if (isFull()) {
//             return false;
//         }
//         // Way - 01
//         if (front == 0) {
//             front = capacity - 1; // Wrap around to the end
//         } else {
//             front--; // Simply decrement front
//         }
//         // Way - 02 (Alternative method commented out)
//         // front = (front - 1 + capacity) % capacity;
//         v[front] = value;
//         size++;
//         return true;
//     }

//     public boolean insertLast(int value) {
//         if (isFull()) {
//             return false;
//         }
//         v[back] = value;
//         // Way - 01
//         if (back == capacity - 1) {
//             back = 0; // Wrap around to the beginning
//         } else {
//             back++; // Simply increment back
//         }
//         // Way - 02 (Alternative method commented out)
//         // back = (back + 1) % capacity;
//         size++;
//         return true;
//     }
//     public boolean deleteFront() {
//         if (isEmpty()) {
//             return false;
//         }
//         v[front] = -1;
//         // Way - 01
//         if (front == capacity - 1) {
//             front = 0; // Wrap around to the beginning
//         } else {
//             front++; // Simply increment front
//         }
//         // Way - 02 (Alternative method commented out)
//         // front = (front + 1) % capacity;
//         size--;
//         return true;
//     }
//     public boolean deleteLast() {
//         if (isEmpty()) {
//             return false;
//         }
//         if (back == 0) {
//             back = capacity - 1; // Wrap around to the end
//         } else {
//             back--; // Simply decrement back
//         }
//         v[back] = -1;
//         size--;
//         return true;
//     }
//     public int getFront() {
//         if (isEmpty()) {
//             return -1;
//         }
//         return v[front];
//     }
//     public int getRear() {
//         if (isEmpty()) {
//             return -1;
//         }
//         if (back == 0) {
//             return v[capacity - 1]; // Wrap around to the last valid element
//         } else {
//             return v[back - 1]; // Get the last element
//         }
//     }
//     public boolean isEmpty() {
//         return size == 0;
//     }
//     public boolean isFull() {
//         return size == capacity;
//     }
// }
