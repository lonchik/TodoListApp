import React, {Component} from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
  }
 
  addItem(e) {
if (this._inputElement.value !== "") {
  let newItem = {
    text: this._inputElement.value,
    key: Date.now() //this will be a unique id (not indexed?)
  };

  this.setState ((prevState) => {
    return {
      items: prevState.items.concat(newItem) //takes items from previous state and adds newItem which will contain new value 
    };
  });

this._inputElement.value = ""; //why we need this?
console.log(this.state.items);

e.preventDefault(); //used to clear the value?s

}
  }

   
  //adding items
  render() { //will render it on the page
    return (
<div className="todoListMain">
  <div className="header">
   
     <form onSubmit={this.addItem}>
    
    <input ref={(a) => this._inputElement = a}
      placeholder="enter task">

      </input>


    <button type="submit">add</button>
    </form>
  </div>
        <TodoItems entries={this.state.items}/>

</div>
    );
  }
}

//display items

// style

//remove items

//animation

export default TodoList;