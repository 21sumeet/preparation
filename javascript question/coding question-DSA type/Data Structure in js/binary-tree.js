// Binary Tree Node class
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const arr = [4, 2, 5, 1, 3];
let root = null;
for (let v of arr) {
  root = insert(root, v);
}
console.log("Preorder traversal:");
preorder(root);

// Insert function
function insert(root, value) {
  if (root === null) {
    root = new Node(value);
    return root;
  }

  if (root.left === null) {
    root.left = new Node(value);
  } else if (root.right === null) {
    root.right = new Node(value);
  } else {
    if (!isFull(root.left)) {
      root.left = insert(root.left, value);
    } else {
      root.right = insert(root.right, value);
    }
  }
  return root;
}

// Check if a node is full (has both children)
function isFull(root) {
  if (root === null) return false;
  if (root.left === null && root.right === null) return false;
  if (root.left === null || root.right === null) return false;
  return isFull(root.left) && isFull(root.right);
}

// Preorder traversal
function preorder(root) {
  if (root === null) return;
  console.log(root.value + " ");
  preorder(root.left);
  preorder(root.right);
}
