var input = [
    ["t-shirt", "dress shirt"],
    ["dress shirt", "pants"],
    ["dress shirt", "suit jacket"],
    ["tie", "suit jacket"],
    ["pants", "suit jacket"],
    ["belt", "suit jacket"],
    ["suit jacket", "overcoat"],
    ["dress shirt", "tie"],
    ["suit jacket", "sun glasses"],
    ["sun glasses", "overcoat"],
    ["left sock", "pants"],
    ["pants", "belt"],
    ["suit jacket", "left shoe"],
    ["suit jacket", "right shoe"],
    ["left shoe", "overcoat"],
    ["right sock", "pants"],
    ["right shoe", "overcoat"],
    ["t-shirt", "suit jacket"]
];

// Create a map to store dependencies
var dependencyMap = {};

/*
This loop iterates through each sub-array in the input array.
For each sub-array, it extracts the dependency and item values.
It then adds the dependency to the array in the dependencyMap corresponding to the item.
This step is used to build a map of dependencies for each item.
*/
input.forEach(([dependency, item]) => {
    if (!dependencyMap[item]) {
        dependencyMap[item] = [];
    }
    dependencyMap[item].push(dependency);
});

/*
@function -  To recursively get the order of items
This function will be used recursively to 
determine the order of putting on clothing 
items based on their dependencies.
*/
function getOrder(item, order) {
    /*
    Within the getOrder function
    if the current item has dependencies (i.e., if it exists in the dependencyMap), 
    it iterates through each dependency and recursively calls the getOrder function on that dependency. 
    This ensures that dependencies are processed first.
    */
    if (dependencyMap[item]) {
        dependencyMap[item].forEach(dependency => getOrder(dependency, order));
    }

    /*
    The getOrder function then adds the current item 
    to the order array (provided it's not already present). 
    This helps maintain the order in which the items are processed.
    */
    if (!order.includes(item)) {
        order.push(item);
    }
}

// Create an array to store the order of items
var itemOrder = [];

/*
The below code iterates through each key in the dependencyMap (which represents each unique clothing item) 
and calls the getOrder function to determine the order in which items should be put on. 
The resulting order is stored in the itemOrder array.
*/
Object.keys(dependencyMap).forEach(item => getOrder(item, itemOrder));

// Group items that can be put on at the same time
var groupedItems = {};

/*
The below code iterates through each item in the itemOrder array.
For each item, it checks if the item has dependencies in the dependencyMap.
If it does, it creates a sorted and comma-separated string of its dependencies as the key.
If it doesn't have dependencies, the key is set to "no_dependencies".
It then adds the item to the array in the groupedItems object corresponding to the determined key.
*/
itemOrder.forEach(item => {
    var key = dependencyMap[item] ? dependencyMap[item].sort().join(",") : "no_dependencies";
    if (!groupedItems[key]) {
        groupedItems[key] = [];
    }
    groupedItems[key].push(item);
});

// Print the output
Object.values(groupedItems).forEach(group => console.log(group.join(", ")));
