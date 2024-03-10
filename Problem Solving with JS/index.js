// Write code to test the functions

// Import the necessary functions
import { Node } from './problems/selectors.js';
import { clone } from './problems/objects.js';
import { readMessages, filter } from './problems/iterables.js';


// Test for selectors.js
// console.log('Testing selectors.js functionality:');
// const rootNode = new Node('div', [
//     new Node('div', [], ['box'], 'box-1'),
//     new Node('div', [new Node('div', [], ['box'], 'box-2-1')], ['box'], 'box-2'),
//     new Node('div', [], ['box'], 'box-3')
// ], [], 'container');    
// console.log(rootNode.search('box').map(node => node.id)); 

// Create a DOM tree structure as per the assignment description
const body = new Node('body', [
    new Node('div', [
        new Node('span', [], ['note'], 'span-1'),
        new Node('span', [], [], 'span-2'),
        new Node('div', [
            new Node('p', [], ['sub1-p1', 'note'], 'para-1'),
            new Node('span', [], ['sub1-span3'], 'span-3')
        ], ['subContainer1'], 'div-2'),
        new Node('div', [
            new Node('section', [
                new Node('label', [], [], 'lbl-1')
            ], [], 'sec-1')
        ], ['subContainer2'], 'div-3'),
        new Node('div', [
            new Node('span', [], ['mania'], 'span-4'),
            new Node('span', [], ['note', 'mania'], 'span-5')
        ], [], 'div-4')
    ], ['mainContainer'], 'div-1'),
    new Node('span', [], ['randomSpan'], 'span-6')
], [], 'content');

// Assuming divNode1, divNode2, p1, and randomNode are already defined
// For the sake of completeness, let's define some of these nodes explicitly for testing
const divNode1 = body.children[0]; // div with id="div-1"
const divNode2 = divNode1.children[2]; // Second div inside divNode1, which should be with id="div-2"
const p1 = divNode2.children[0]; // p inside divNode2, which should be with id="para-1"
const randomNode = new Node('div', [], [], 'random'); // A standalone node for testing

console.log("Started...");

// Test case 1
console.log(divNode1.search("span").map(node => node.id));

// Test case 2
console.log(divNode1.search(".note").map(node => node.id));

// Test case 3
console.log(divNode1.search("label").map(node => node.id));

// Test case 4
console.log(p1.search(".note").map(node => node.id));

// Test case 5
console.log(divNode1.search("div").map(node => node.id));

// Test case 6
console.log(randomNode.search("div").map(node => node.id));

// Test case 7
console.log(divNode2.search("section").map(node => node.id));

// Test case 8
try {
    console.log(body.search().map(node => node.id));
} catch (error) {
    console.log(error.message); // Handle error for undefined or invalid selector
}

// Test case 9
console.log(body.search("section").map(node => node.id));

// Test case 10
console.log(divNode1.search(".randomSpan").map(node => node.id));




// Test for objects.js
const originalObject = {
    name: "Original Object",
    details: {
      email: "rais.s@northeastern.edu",
        nuid: { admitYear: 2023, id: "002830773" },
    },
  };
  let deepClone = clone(originalObject);
  deepClone.details.nuid.id = "002840879";
  deepClone.details.email = "raj.r@northeastern.edu";
  
  console.log(originalObject.details, " ORIGINAL");
  console.log(deepClone.details, " DEEP COPY");


// Test for iterables.js
console.log('\nTesting iterables.js functionality:');
const messages = ['Object created', 'Object is being processed', 'Object processing completed'];
readMessages([...messages]); 

const items = [1, 2, 3, 4, 5];
const evenItems = filter(items, item => item % 2 === 0);
console.log(evenItems); 
