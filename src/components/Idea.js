import React, { Component } from 'react'
import '../App.css';
class Idea extends Component {

  handleClick = (e) => {
    this.props.onClick(this.props.idea.id, e.target.dataset.type)
  } 
  
  handleDelete = () => {
    this.props.onDelete(this.props.idea.id)
  }
  
  render(){
    const {idea} = this.props;

    return (
      <div className="brick" key={idea.id}>
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>
        <h4 data-type="title" onClick={this.handleClick}>
          {idea.title}
        </h4>
        <p data-type="body" onClick={this.handleClick}>
          {idea.body}
        </p>
      </div>
    );
  }
}

export default Idea
