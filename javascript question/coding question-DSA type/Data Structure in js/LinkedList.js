// //java code for Linkedlist implementation
// class LL {
//     class Node {
//         String data;
//         Node next;

//         Node(String data){
//             this.data = data;
//             this.next = null;
//         }
//     }
//     Node head;

//     //add values in first linkedlist
//     public void addFirst(String data){
//         Node newNode = new Node(data);
//         if(head==null){
//             head = newNode;
//         }else{
//             newNode.next = head;
//             head = newNode;
//         }
//     }

//     //add values in last of ll
//     public void addlast(String data){
//         Node newNode = new Node(data);
//         if(head==null){
//             head = newNode;
//         }
//         Node curr = head;
//         while(curr.next!=null){
//             curr = curr.next;
//         }
//         curr.next = newNode;
//     }

// //delete value
//     public void delete(String data){
//         // Case 1: The list is empty
//         if (head == null) {
//           return;
//         }
//         // Case 2: The node to delete is the head node
//         if (head.data==data) {
//             head = head.next;
//             return;
//         }
//         Node prev = head;
//         Node curr = head.next;
//         while (curr != null) {
//             if (curr.data == data) {
//                 prev.next = curr.next; 
//                 return; 
//             }
//             prev = curr;
//             curr = curr.next;
//         }
//     }

 // public void deletefirst(){
 //        if(head == null){
 //                System.out.print("linkedin list is empty");
 //        }
 //        head = head.next;
 //    }

 //    public void deletelast(){
 //        if(head == null){
 //                System.out.print("linkedin list is empty");
 //        }  
 //        if(head.next==null){
 //                head =null;
 //                return;
 //        }
 //        Node last = head.next;
 //        Node secondlast = head;
 //        while(last.next != null){
 //                last = last.next;
 //                secondlast = secondlast.next;
 //        }
 //        secondlast.next = null;
 //    }


//     //print ll
//     public void printll(){
//         if(head==null){
//             System.out.println("EMPTY");
//             return;
//         }
//         Node curr = head;
//         while(curr!=null){
//             System.out.print(curr.data + "->");
//             curr = curr.next;
//         }

//     }
//     public static void main(String[] args) {
//         LL list = new LL();
//         list.addFirst("1");
//         list.addFirst("2");
//         list.addlast("0");
           //list.delete("0");
          //list.deletefirst();
          //list.deletelast();
//         list.printll();

//     }
// }

// JavaScript code for LinkedList implementation
class LL {
    constructor() {
        this.head = null;
    }

    // Node class
    static Node = class {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    };

    // add value at the beginning of the linked list
    addFirst(data) {
        const newNode = new LL.Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    // add value at the end of the linked list
    addlast(data) {
        const newNode = new LL.Node(data);
        if (this.head === null) {
            this.head = newNode;
            return; // fix: must return, otherwise curr.next throws error
        }
        let curr = this.head;
        while (curr.next !== null) {
            curr = curr.next;
        }
        curr.next = newNode;
    }

    // delete a value
    delete(data) {
        // Case 1: The list is empty
        if (this.head === null) {
            return;
        }
        // Case 2: The node to delete is the head node
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }
        let prev = this.head;
        let curr = this.head.next;
        while (curr !== null) {
            if (curr.data === data) {
                prev.next = curr.next;
                return;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    // delete first node
    deletefirst() {
        if (this.head === null) {
            console.log("linked list is empty");
            return;
        }
        this.head = this.head.next;
    }

    // delete last node
    deletelast() {
        if (this.head === null) {
            console.log("linked list is empty");
            return;
        }
        if (this.head.next === null) {
            this.head = null;
            return;
        }
        let last = this.head.next;
        let secondlast = this.head;
        while (last.next !== null) {
            last = last.next;
            secondlast = secondlast.next;
        }
        secondlast.next = null;
    }

    // print linked list
    printll() {
        if (this.head === null) {
            console.log("EMPTY");
            return;
        }
        let curr = this.head;
        let output = "";
        while (curr !== null) {
            output += curr.data + "->";
            curr = curr.next;
        }
        console.log(output);
    }
}

// main
const list = new LL();
list.addFirst("1");
list.addFirst("2");
list.addlast("0");
// list.delete("0");
// list.deletefirst();
// list.deletelast();
list.printll();
