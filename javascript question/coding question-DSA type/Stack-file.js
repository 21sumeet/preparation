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
