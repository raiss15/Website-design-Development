
/**
 * This function deep clones any JavaScript object and returns the cloned object.
 * No extrenal library should be use to implement this.
 *
 * @param {Object} objectToClone the object to clone.
 * @returns {Object} the cloned object
 */

export const clone = (objectToClone) => {
    // If the objectToClone is null or not an object, return the same object
    if(typeof objectToClone !== 'object' || objectToClone === null){
        return objectToClone;
    }
 
    // If the objectToClone is an array, deep clone each item in the array
    if(Array.isArray(objectToClone)){
        return objectToClone.map(item => clone(item)); // Recursive function
    }
 
    // For non-array objects, create a shallow clone using the spread operator
    const clonedObject = { ...objectToClone };
 
    // Iterate over each key in the object and recursively deep clone nested objects
    Object.keys(clonedObject).forEach(
        key => clonedObject[key] = clone(objectToClone[key])
    );
 
    // Return the cloned object with all nested objects deeply cloned
    return clonedObject;
}