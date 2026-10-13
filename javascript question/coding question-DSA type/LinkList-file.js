// //java code - reverese linklist - 206
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

// //234. Palindrome Linked List - java 234
//  public ListNode reverse(ListNode head) {
//         ListNode prev = null;
//         ListNode curr = head;
//         while(curr != null) {
//             ListNode next = curr.next;
//             curr.next = prev;
//             prev = curr;
//             curr = next;
//         }
//         return prev;
//     }
//     public boolean isPalindrome(ListNode head) {
//         if (head == null || head.next == null) return true;
//         ListNode slow = head;
//         ListNode fast = head;
//         // Find middle of the list
//         while(fast != null && fast.next != null){
//             slow = slow.next;
//             fast = fast.next.next;
//         }
//         // Reverse second half
//         ListNode rev = reverse(slow);
//         // Compare first and second halves
//         ListNode curr = head;
//         while(rev != null){
//             if(curr.val != rev.val){
//                 return false;
//             }
//             curr = curr.next;
//             rev = rev.next;
//         }
//         return true;
//     }
// }

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
var isPalindrome = function(head) {
    let fast = head;
    let slow = head;
    while(fast!=null && fast.next != null){
        fast = fast.next.next;
        slow = slow.next;
    }

    let rev = reverseList(slow);
    let curr = head;
    while(rev!=null){
        if(rev.val != curr.val) return false;
        rev = rev.next;
        curr = curr.next
    }
    return true 

};

// //merge two sorted list- java code - 21
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

// // 160. Intersection of 2 linked list - java - 160
// public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
//         ListNode t1 = headA;
//         ListNode t2 = headB;
//         while(t1!=t2){
//             t1 = (t1==null )? headB : t1.next;
//             t2 = (t2==null) ? headA :t2.next;
//         }
//         return t1;
// }
var getIntersectionNode = function(headA, headB) {
    let t1 = headA;
    let t2 = headB;
    while (t1 !== t2) {
        t1 = (t1 === null) ? headB : t1.next;
        t2 = (t2 === null) ? headA : t2.next;
    }
    return t1;
};


// //detect cycle in linkelist- java - 141 
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

// // remove duplicate in sorted linklist - java - 83
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

//61. Rotate List - java code - 61
// public ListNode rotateRight(ListNode head, int k) {
//         if (head == null || head.next == null || k == 0) return head;

//         // Step 1: Count length
//         int len = 1;
//         ListNode tail = head;
//         while (tail.next != null) {
//             len++;
//             tail = tail.next;
//         }

//         // Step 2: Make list circular
//         tail.next = head;

//         // Step 3: Find new tail: (len - k % len)th node
//         int stepsToNewTail = len - (k % len);
//         ListNode newTail = head;
//         for (int i = 1; i < stepsToNewTail; i++) {
//             newTail = newTail.next;
//         }

//         // Step 4: Break circle
//         ListNode newHead = newTail.next;
//         newTail.next = null;

//         return newHead;
//     }
var rotateRight = function(head, k) {
    if(head === null || head.next === null || k === 0) return head;

    // Step 1: Count length
    let len = 1;
    let tail = head;
    while(tail.next !== null) {
        len++;
        tail = tail.next;
    }
    // Step 2: Make list circular
    tail.next = head;
    // Step 3: Find new tail: (len - k % len)th node
    let stepsToNewTail = len - (k % len);
    let newTail = head;
    for(let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }
    // Step 4: Break circle
    let newHead = newTail.next;
    newTail.next = null;

    return newHead;
};
