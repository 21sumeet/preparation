// // 20. Valid Parentheses - java code - 20
//     public static boolean isValid(String s) {
//         Stack<Character> stack = new Stack<>();
//         for(char ch: s.toCharArray()){
//             if (ch == '(' || ch == '{' || ch == '['){
//                 stack.push(ch);
//             }else{
//                 if(ch == ')'){
//                  if(stack.isEmpty() || stack.pop()!='('){
//                     return false;
//                  }
//                 }
//                 if(ch == '}'){
//                  if(stack.isEmpty() || stack.pop()!='{'){
//                     return false;
//                  }
//                 }
//                 if(ch == ']'){
//                  if(stack.isEmpty() || stack.pop()!='['){
//                     return false;
//                  }
//                 }
//             }
//         }
//         return stack.isEmpty();
//     }
var isValid = function(s) {
    let stack = []; 
    for(let ch of s) {
        if(ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        } else {
            if(ch === ')') {
                if(stack.length === 0 || stack.pop() !== '(') {
                    return false;
                }
            }
            if(ch === '}') {
                if(stack.length === 0 || stack.pop() !== '{') {
                    return false;
                }
            }
            if(ch === ']') {
                if(stack.length === 0 || stack.pop() !== '[') {
                    return false;
                }
            }
        }
    }
    
    return stack.length === 0;
};

// // 232. Implement Queue using Stacks - java - 232
// class MyQueue {
//     private Stack<Integer> first=new Stack<Integer>();
//     private Stack<Integer> second=new Stack<Integer>();
//     //private int  front;
//     public MyQueue() {  }
//     public void push(int x) {
//         first.push(x);
//     }
//     public int pop() {
//         while(!first.isEmpty()){
//             second.push(first.pop());
//         }
//         int removed=second.pop();
//         while(!second.isEmpty()){
//             first.push(second.pop());
//         }
//         return removed;
//     }
//     public int peek() {
//         while(!first.isEmpty()){
//             second.push(first.pop());
//         }
//         int removed=second.peek();
//         while(!second.isEmpty()){
//             first.push(second.pop());
//         }
//         return removed;
//     }
//     public boolean empty() {
//         return first.isEmpty();
//     }
// }
class MyQueue {
    constructor() {
        this.first = [];   // Stack 1
        this.second = [];  // Stack 2
    }
    
    push(x) {
        this.first.push(x);
    }
    
    pop() {
        while(this.first.length > 0) {
            this.second.push(this.first.pop());
        }
        let removed = this.second.pop();
        while(this.second.length > 0) {
            this.first.push(this.second.pop());
        }
        return removed;
    }
    
    peek() {
        while(this.first.length > 0) {
            this.second.push(this.first.pop());
        }
        let removed = this.second[this.second.length - 1];  // peek
        while(this.second.length > 0) {
            this.first.push(this.second.pop());
        }
        return removed;
    }
    
    empty() {
        return this.first.length === 0;
    }
}


// // 1047. Remove All Adjacent Duplicates In String
// public String removeDuplicates(String s) {
//         Stack<Character> stack = new Stack<>();
//         for(char ch : s.toCharArray()){
//             if(!stack.isEmpty() && stack.peek() ==ch){
//                 stack.pop();
//             }else{
//                 stack.push(ch);
//             }
//         }
//         StringBuilder result = new StringBuilder();
//         for(char ch : stack){
//             result.append(ch);
//         }
//         return  result.toString();
//     }
var removeDuplicates = function(s) {
    let stack = [];
    for(let ch of s) {
        if(stack.length > 0 && stack[stack.length - 1] === ch) {
            stack.pop();  // adjacent duplicate → remove
        } else {
            stack.push(ch);
        }
    }
    return stack.join('');
};


// //  496. Next Greater Element I- java - 496
// public int[] nextGreaterElement(int[] nums1, int[] nums2) {
//         HashMap <Integer , Integer > map = new HashMap<>();
//         Stack <Integer> stack = new Stack<>();
//         for( int num : nums2){
//             while(!stack.isEmpty() && num>stack.peek()){
//                 map.put( stack.pop(), num);
//             }
//             stack.push(num);
//         }
//         int[] res = new int [nums1.length];
//         for( int i =0 ; i<nums1.length ; i++){
//             res[i] = map.getOrDefault(nums1[i] , -1);
//         }
//         return res ;
//     }
var nextGreaterElement = function(nums1, nums2) {
    const map = new Map();
    const stack = [];
    // Build map: for each num in nums2, find its next greater element
    for(let num of nums2) {
        while(stack.length > 0 && num > stack[stack.length - 1]) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    // For each num in nums1, get its next greater or -1
    const res = [];
    for(let i = 0; i < nums1.length; i++) {
        res[i] = map.has(nums1[i]) ? map.get(nums1[i]) : -1;
    }
    return res;
};
