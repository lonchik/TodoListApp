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

  updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.addItem = JSON.stringify(this.state.items);
  }
  
 deleteItem(key){
   let filteredItems = this.state.items.filter(function (item) { 
    return (item.key !==key); //retrun all items in the array that do not equal to the key
   });

   this.setState({    
    items: filteredItems, //items are now all the filtered items without the one being filtered out
    });
  }

 
  addItem(e) { 
    if (this._inputElement.value !== "") { //if value is not empty 
        let newItem = {  
        text: this._inputElement.value,
        key: Date.now() //this will be a unique id (not indexed?)
      }; //create a new object with text, key
    
   
    
      this._inputElement.value = ""; //this will clear the value
      this.setState ((prevState) => {
        return {
            items: prevState.items.concat(newItem), //takes items from previous state and adds newItem which will contain new value 
            inputText: ""
          };
      });
    
      console.log(this.state.items);
        
      e.preventDefault(); //what does it do?
      e.stopPropagation();
    }
  }

 checkDuplicates(text) { 
  
    let matchingItems = this.state.items.filter(function(item) { 
      return (item.text == text) //if true
    });
   
   return matchingItems.length !== 0  //checkDuplicates return true if we get any number of matches >0
    //do we need this second check?
 };

 componentDidUpdate(prevProps, prevState) {
  const isDuplicate = this.checkDuplicates(this.state.inputText);
  if (isDuplicate && !prevState.error) {  //if we get a duplicate and previous state does not contain an error
    this.setState({
      error: 'This item already exists!' 
    }); 
  }
  if (prevState.error && !isDuplicate) {
    this.setState ({
      error: undefined //does undefined clear erorr state????
    })
  }
  

 }
//need to add a listener inside the render function

  //adding items
  handleChange = (e) => {  //key listener
    this.setState({
      inputText: e.target.value //target is the event is bound to 
    
    })
  }

  render() { //will render it on the page
    return (
<div className="todoListMain">
  <div className="header">
  <form onSubmit={this.addItem}>
    {this.state.error && (<div className="validation">{this.state.error}</div>)}
    
    <input 
      ref={(element) => this._inputElement = element}
      onChange={this.handleChange}
      placeholder="enter task">
    </input>


    <button type="submit" disabled={!!this.state.error}>add</button>
    </form>
  </div>
        <TodoItems entries={this.state.items}
        delete={this.deleteItem}/>

</div>
    );
  }
}


export default TodoList;