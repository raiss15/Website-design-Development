/**
* A Node represents an HTML Element. A node can have a tag name, a list of CSS
* classes and a list of children nodes.
*/
export class Node {

    /**
     *
     * @param {String} tag the tag name
     * @param {Array} children the children nodes
     * @param {Array} classes the css classes
     * @param {String} id the node id
     */
    constructor(tag, children, classes, id) {
      // Tag name of the node.
      this.tag = tag;
      // Array of CSS class names (string) on this element.
      this.classes = classes;
      // Array of child nodes.
      this.children = children; // All children are of type Node
      this.id = id;
    }
    

    /**
    * Returns all nodes matching the class selector.
    *
    * For example:
    *
    * <div class="container">
    *   <div id="box-1" class="box"></div>
    *   <div id="box-2" class="box">
    *       <div id="box-2-1" class="box"></div>
    *   </div>
    *   <div id="box-3" class="box">
    *     <div class="content"></div>
    *   </div>
    * </div>
    * Selector `box` should return 4 div nodes in this order
    * box-1 -> box-2-1 -> box-2 -> box-3.
    *
    * @param {string} the selector string.
    * @returns {Array} Array of selected nodes.
    * @public
    */

    // search(selector) {
    //   let result = [];
   
    //   // Recursively search in each child first and concatenate the results
    //   this.children.forEach((child) => {
    //     const childResults = child.search(selector);
    //     result = result.concat(childResults);
    //   });
   
    //   // Check if the current node has the class after checking its children
    //   if (this.classes.includes(selector)) {
    //     result.push(this); // Add this node to the result if it matches the selector
    //   }
   
    //   return result;
    // }

    search(selector) {
      let result = [];
      // Determine the selector type and the normalized selector value
      const selectorType = selector[0];
      const normalizedSelector = selector.substring(1);
  
      // Recursively search in each child first
      this.children.forEach((child) => {
          result = result.concat(child.search(selector));
      });
  
      // Check if the current node matches the selector criteria
      if (selectorType === '.' && this.classes.includes(normalizedSelector)) {
          // Class selector
          result.push(this);
      } else if (selectorType === '#' && this.id === normalizedSelector) {
          // ID selector
          result.push(this);
      } else if (selectorType !== '.' && selectorType !== '#' && this.tag === selector) {
          // Tag name selector
          result.push(this);
      }
  
      return result;
  }
  
  

}