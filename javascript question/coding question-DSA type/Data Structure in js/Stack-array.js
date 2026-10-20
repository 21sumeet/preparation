// //Implement stack - java code 
// import java.util.ArrayList;

// class Stack {
//     ArrayList<Integer> list = new ArrayList<>();
//     // Push: Add element
//     void push(int x) {
//         list.add(x);
//     }
    
//     // Pop: Remove top element
//     void pop() {
//         if (list.isEmpty()) {
//             System.out.println("Stack is empty");
//             return;
//         }
//         list.remove(list.size() - 1);
//     }
    
//     // Peek: Get top element
//     int peek() {
//         if (list.isEmpty()) {
//             return -1;
//         }
//         return list.get(list.size() - 1);
//     }

//     public static void main(String[] args) {
//         Stack s = new Stack();

//         s.push(10);
//         s.push(20);
//         s.push(30);

//         System.out.println(s.peek()); // 30

//         s.pop();

//         System.out.println(s.peek()); // 20
//     }
// }

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
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

const stack = new Stack();
console.log(stack.isEmpty());
stack.push(20);
stack.push(10);
stack.push(30);
console.log(stack.size());
stack.print();
console.log(stack.pop());
console.log(stack.peek());
stack.print();
