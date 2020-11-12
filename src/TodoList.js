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
    items: filteredItems,
    });
  }

 
  addItem(e) { 
    if (this._inputElement.value !== "") {
        let newItem = {
        text: this._inputElement.value,
        key: Date.now() //this will be a unique id (not indexed?)
      };
    
   
    if (!this.checkDuplicates(newItem.text)) {
      this.setState ((prevState) => {
      return {
      
      items: prevState.items.concat(newItem) //takes items from previous state and adds newItem which will contain new value 
            };
      });
    
      this._inputElement.value = ""; //this will clear the value
      console.log(this.state.items);
    
    } 
        e.preventDefault(); //what does it do?
        e.stopPropagation();
    }
  }

 checkDuplicates(text) {
  
    let matchingItems = this.state.items.filter(function(item) { 
      return (item.text == text)
    });
   
   return matchingItems.length !== 0 
  
   
 };

 componentDidUpdate(prevProps, prevState) {
  const isDuplicate = this.checkDuplicates(this._inputElement.value);
  if (isDuplicate && !prevState.error) {
    this.setState({
      error: 'This item already exists!' 
    }); 
  }
  if (prevState.error && !isDuplicate) {
    this.setState ({
      error: undefined
    })
  }
  

 }
  
//need to add a listener inside the render function

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