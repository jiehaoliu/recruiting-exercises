class InventoryAllocator{
    constructor(order,inventoryInfo){
        this.order = order
        this.inventoryInfo = inventoryInfo
    }

    allocateInventory(){
        let result = []                 // final result to be returned 
        let orderCopy = this.order      // a copy of order information which will be updated each time an assignment is made
        
        /* check if spliting can be avoided for the first time we visit all warehouses */
        Object.keys(orderCopy).forEach((key)=>{      
            this.inventoryInfo.forEach((warehouse)=>{
                const inventory = warehouse.inventory     // inventory data, e.g. "apple": 1, "banana":5
                if( typeof orderCopy[key]!=='undefined' && inventory[key]>0){   // if the current warehouse has the item on the order list
                    if(orderCopy[key]<=inventory[key]){   // if the stock is enough
                        let ChosenWarehouse = {}
                        ChosenWarehouse[warehouse.name]={[key]:orderCopy[key]}
                        result.push(ChosenWarehouse)
                        delete orderCopy[key]             // remove the fulfilled item from order list
                    }    
                }
            })
        })

        /* For the second time, we check if there is enough inventory across all warehouses*/
        Object.keys(orderCopy).forEach((key)=>{      
            this.inventoryInfo.forEach((warehouse)=>{
                const inventory = warehouse.inventory     // inventory data, e.g. "apple": 1, "banana":5
                if( typeof orderCopy[key]!=='undefined' && inventory[key]>0){   // if the current warehouse has the item on the order list
                    if(orderCopy[key]<=inventory[key]){   // if the stock is enough
                        let ChosenWarehouse = {}
                        ChosenWarehouse[warehouse.name]={[key]:orderCopy[key]}
                        result.push(ChosenWarehouse)
                        delete orderCopy[key]             // remove the fulfilled item from order list
                    } 
                    else{                                 // if the current warehouse does not have enough stock
                        let ChosenWarehouse = {}
                        ChosenWarehouse[warehouse.name]={[key]:inventory[key]}
                        result.push(ChosenWarehouse)
                        orderCopy[key] -= inventory[key]  // update orderCopy and lessen the number of the item
                    }   
                }
            })
        })

        if(Object.keys(orderCopy).length!==0) result=[]    // Not enough inventory -> no allocations and clear result!

        return result
    }
}

module.exports = {
    InventoryAllocator: InventoryAllocator
}