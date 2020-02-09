class InventoryAllocator{
    constructor(order,inventoryInfo){
        this.order = order
        this.inventoryInfo = inventoryInfo
    }

    allocateInventory(){
        let result = []                                           // final result to be returned 
        let orderCopy = JSON.parse(JSON.stringify(this.order))    // a deep copy of order information which will be updated each time an assignment is made
        
        for (let key of Object.keys(orderCopy)){                  // for each item on the order
            let splitDelivery = []                                // will be appended to result if split is required
            for(let warehouse of this.inventoryInfo){             // for each warehouse
                const inventory = warehouse.inventory             // inventory data, e.g. "apple": 1, "banana":5
                if( typeof orderCopy[key]!=='undefined' && inventory[key]>0){   // if the current warehouse has the item on the order list
                    if((this.order)[key]<=inventory[key]){        // if the stock is enough, note here we use the original order!
                        let ChosenWarehouse = {}
                        ChosenWarehouse[warehouse.name]={[key]:(this.order)[key]}
                        result.push(ChosenWarehouse)
                        delete orderCopy[key]                     // remove the fulfilled item from orderCopy list
                        break                                     // this item has been fulfilled, no need to check the rest warehouse
                    }
                    else if(orderCopy[key]<=inventory[key]){      // split case, some items have been splited by preivous warehouse(s)
                        if(orderCopy[key]!=0){
                            let ChosenWarehouse = {}
                            ChosenWarehouse[warehouse.name]={[key]:orderCopy[key]}
                            splitDelivery.push(ChosenWarehouse)
                            orderCopy[key] = 0                    // Mark it zero for checking if split is necessary
                        }             
                    }
                    else{                                         // if the current warehouse does not have enough stock
                        let ChosenWarehouse = {}
                        ChosenWarehouse[warehouse.name]={[key]:inventory[key]}
                        splitDelivery.push(ChosenWarehouse)
                        orderCopy[key] -= inventory[key]          // update orderCopy and lessen the number of the item
                    }
                }
            }
            // split has to be made if orderCopy[key] still exists
            if(orderCopy[key] ==0 ){
                delete orderCopy[key]
                result = result.concat(splitDelivery)
            }  
        }

        if(Object.keys(orderCopy).length!==0) result=[]           // Not enough inventory -> no allocations and clear result!

        return result
    }
}

module.exports = {
    InventoryAllocator: InventoryAllocator
}