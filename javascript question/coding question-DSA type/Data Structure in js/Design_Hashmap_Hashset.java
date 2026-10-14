import java.util.Arrays;

/**
 * LeetCode Solutions: 705. Design HashSet & 706. Design HashMap
 * Approach: Direct Mapping / Static Array Strategy
 * Time Complexity for all operations: O(1)
 * Space Complexity: O(M) where M is the maximum element range (1,000,001)
 */
public class Solution {

    // ==========================================
    // 1. LEETCODE 705: DESIGN HASHSET
    // ==========================================
    public static class MyHashSet {
        private boolean[] set;

        public MyHashSet() {
            // Covers values from 0 to 1,000,000 based on LeetCode constraints
            set = new boolean[1000001]; 
        }

        public void add(int key) {
            set[key] = true;
        }

        public void remove(int key) {
            set[key] = false;
        }

        public boolean contains(int key) {
            return set[key];
        }
    }

    // ==========================================
    // 2. LEETCODE 706: DESIGN HASHMAP
    // ==========================================
    public static class MyHashMap {
        private int[] map;

        public MyHashMap() {
            map = new int[1000001];
            // Must fill with -1 since 0 is a valid value in LeetCode test cases
            Arrays.fill(map, -1); 
        }

        public void put(int key, int value) {
            map[key] = value;
        }

        public int get(int key) {
            return map[key];
        }

        public void remove(int key) {
            map[key] = -1;
        }
    }

   
    public static void main(String[] args) {
        System.out.println("--- Testing MyHashSet ---");
        MyHashSet hashSet = new MyHashSet();
        hashSet.add(1);         
        hashSet.add(2);         
        System.out.println("Contains 1: " + hashSet.contains(1)); // returns true
        System.out.println("Contains 3: " + hashSet.contains(3)); // returns false
        hashSet.add(2);          // Handling duplicate values
        System.out.println("Contains 2: " + hashSet.contains(2)); // returns true
        hashSet.remove(2);       
        System.out.println("Contains 2 after removal: " + hashSet.contains(2)); // returns false

        System.out.println("\n--- Testing MyHashMap ---");
        MyHashMap hashMap = new MyHashMap();
        hashMap.put(1, 1);      
        hashMap.put(2, 2);      
        System.out.println("Get key 1: " + hashMap.get(1));    // returns 1
        System.out.println("Get key 3: " + hashMap.get(3));    // returns -1 (not found)
        hashMap.put(2, 1);       // Update the existing value for key 2
        System.out.println("Get updated key 2: " + hashMap.get(2)); // returns 1
        hashMap.remove(2);       // remove the mapping for key 2
        System.out.println("Get key 2 after removal: " + hashMap.get(2)); // returns -1
    }
}
