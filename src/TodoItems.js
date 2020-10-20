import React, {Component} from "react";

class TodoItems extends Component {
  createTasks(item) {
  return <li key={item.key}>{item.text}</li> //weird format?
  
}
//display items

render() {
  let todoEntries = this.props.entries;
  let listItems = todoEntries.map(this.createTasks);

  return (
    <ul className="theList">
      {listItems}
    </ul>
  );
      }

};

export default TodoItems;