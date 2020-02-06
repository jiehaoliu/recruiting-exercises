const fs = require('fs')
const inventoryAllocator = require('./inventoryAllocator')

// process JSON data and convert it to JavaScript array
const dataBuffer = fs.readFileSync('testData.json')
const dataJSON = dataBuffer.toString()
const testCases = JSON.parse(dataJSON)

// loop through all test cases and call InventoryAllocator
let count = 1;

console.log()
console.log("------------- "+"For input, please refer testData.json file"+" ------------")
console.log()
console.log("----------------------------"+" test begins "+"----------------------------")
console.log()

testCases.forEach((testCase) => {
    const order = testCase.order
    const inventoryLists = testCase.inventoryInfo
    const allocator =  new inventoryAllocator.InventoryAllocator(order,inventoryLists)
    const result = allocator.allocateInventory()
    console.log("---------------------------- test case "+count+" ----------------------------")
    console.log("The output is: ")
    console.log(result)
    count++;
});