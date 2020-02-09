Progamming backrgound:
I use JSON as the format of input data, and choose Nodejs & ES6 to code on VS code.

Thinking process:
Assume there are M order items, N warehouses, and for each warehouse, there are an average of K items stored. 
So my initial thought was if there exist some fancy linear time complexity solutions like O(M+N*K) or O(M+N).
The answer is no, because we have to check if the items on the order are stored and how many are stored in each warehouse 
regardless of if no-split first is required or not. Also in the real world, the number of items stocked in a warehouse is 
generally bigger than the number of items on an order (K>>M), so O(M*N) should be smaller than O(K*N), and thus be an ideal 
solution for this particular exercise.

Assumption:
1. Assume all inputs are valid. For example, the number of each ordered item must be greater than zero.
2. Assume non-split first. For the split case, for example, if the order requires 15 apples, the 1st warehouse has 14 and the 2nd one has 15, 
   instead of 14+1 assignment, choose the 2nd warehouse to avoid split.
3. Assume warehouse stock is not required to be updated after allocation. (Although in real world update is a must)
4. Assume there are M order items and N warehouses, the time complexity is around O(M*N)


Testcase 1-3  Happy Case, exact inventory match!
Testcase 4-6  Not enough inventory -> no allocations!
Testcase 7-10  Should split an item across warehouses if that is the only way to completely ship an item.

Instruction:
1. To start, please go to src and type command: node solution.js, the result will be printed in the terminal
2. To check test cases, please view testData.json
3. To check impletation of inventoryAllocator class, please view inventoryAllocator.js 

