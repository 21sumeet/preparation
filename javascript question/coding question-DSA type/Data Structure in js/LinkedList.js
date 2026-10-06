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
//         list.printll();

//     }
// }
