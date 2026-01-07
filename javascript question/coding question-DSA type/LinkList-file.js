// //java code - reverese linklist
// public ListNode reverseList(ListNode head) {
//         ListNode prev = null;
//         ListNode curr = head;
//         if(head==null || head.next==null){
//             return head;
//         }
//         ListNode next = head.next;
//         while(curr!=null){
//             curr.next=prev;
//             prev =curr;
//             curr = next;
//             if(next==null){
//                 break;
//             }
//             next= next.next;
//         }
//         return prev;
//     }
//javascript code
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

// //merge two sorted list- java code
// public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
//         if (list1 == null) return list2; // If list1 is empty, return list2
//         if (list2 == null) return list1; // If list2 is empty, return list1

//         ListNode newlist ;
//         if(list1.val < list2.val){
//             newlist = list1;
//             list1 = list1.next;
//         }else {
//             newlist = list2;
//             list2 = list2.next;
//         }
//         ListNode head2 =newlist ;

//         while(list1 != null && list2 != null ){
//             if(list1.val < list2.val){
//                 newlist.next = list1 ;
//                 list1 = list1.next;
//             } else {
//                 newlist.next = list2;
//                 list2 = list2.next;
//             }
//             newlist = newlist.next;
//         }
//         if (list1 != null) newlist.next = list1;
//         if (list2 != null) newlist.next = list2;

//         return head2; // Return the head of the merged list
//     }

//javascript code
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  let newhead;
  if (list1.val < list2.val) {
    newhead = list1; // Store node
    list1 = list1.next;
  } else {
    newhead = list2; // Store node
    list2 = list2.next;
  }
  let current = newhead;
  // Check BOTH lists exist before comparing
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  // Attach remaining nodes
  if (list1 !== null) current.next = list1;
  if (list2 !== null) current.next = list2;
  return newhead;
};

// //detect cycle in linkelist- java
// public boolean hasCycle(ListNode head) {
//         if(head == null ) return false ;
//         ListNode fast = head ;
//         ListNode slow = head ;
//         while (fast != null && fast.next != null){
//             fast = fast.next.next ;
//             slow = slow.next ;
//             if(fast == slow ){
//                 return true ;
//             }
//         }
//         return false ;
//     }
var hasCycle = function (head) {
  if (head == null) return false;
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      return true;
    }
  }
  return false;
};

// // remove duplicate in sorted linklist - java
// public ListNode deleteDuplicates(ListNode head) {
//         ListNode current = head;
//         while(current!=null && current.next!=null){
//             if(current.val ==current.next.val){
//                 current.next=current.next.next;
//             }else{
//                 current = current.next;
//             }
//         }
//         return head;
//     }
var deleteDuplicates = function (head) {
  let current = head;
  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};
