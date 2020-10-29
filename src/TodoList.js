import React, {Component} from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);


  }

 
 deleteItem(key){
   let filteredItems = this.state.items.filter(function (item) {
    return (item.key !==key);
   });
  
   this.setState({    
    items: filteredItems
    });
  }

  addItem(e) { 
if (this._inputElement.value !== "") {
    let newItem = {
    text: this._inputElement.value,
    key: Date.now() //this will be a unique id (not indexed?)
  };


  let matchingItems = this.state.items.filter(function(item) { 
    return (item.text == newItem.text)
});
if (matchingItems.length === 0) {
  this.setState ((prevState) => {
  return {
  
  items: prevState.items.concat(newItem) //takes items from previous state and adds newItem which will contain new value 
        };
  });

  this._inputElement.value = ""; //this will clear the value
  console.log(this.state.items);

} else{
  this.setState({
    error: 'This item already exists!'
  })
};
    e.preventDefault(); //what does it do?
    e.stopPropagation();
}
          }

   
  //adding items
  render() { //will render it on the page
    return (
<div className="todoListMain">
  <div className="header">
    {this.state.error && (<div className="validation">{this.state.error}</div>)}
    <form onSubmit={this.addItem}>
    
    <input ref={(a) => this._inputElement = a}
      placeholder="enter task">
    </input>


    <button type="submit">add</button>
    </form>
  </div>
        <TodoItems entries={this.state.items}
        delete={this.deleteItem}/>

</div>
    );
  }
}


export default TodoList;