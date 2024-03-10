/**
 * The input argument messages is an array containing a list of messages in the order
 * it was received from a message broker. This method removes the messages in the order
 * it was received from the array and prints word count in each message.
 *  Eg:
 *  const messages = ['Object created', 'Object is being processing', 'Object processing completed'];
 *  readMessages(messages);
 *  // 2, 4, 3
 *
 * @param {Array} messages the array of strings
 */
export const readMessages = (messages) => {
    while (messages.length > 0) {
        const message = messages.shift(); // Remove the first message from the array
        const wordCount = message.split(' ').length; // Count the words in the message
        console.log(wordCount); // Print the word count
    }
};

/**
 * This method filters the items based on the predicate function and returns a new array with the
 * filtered items. This implementation should not use the Array.prototype.filter(). The predicate
 * function will return true if the item needs to returned and false if the item needs to be ignored.
 *
 * @param {Array} items the array of items
 * @param {Function} predicate the predicate function
 * @returns {Array} the new filtered array
 */
export const filter = (items, predicate) => {
    const filteredItems = [];
    for (const item of items) {
        if (predicate(item)) {
            filteredItems.push(item);
        }
    }
    return filteredItems;
};