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
