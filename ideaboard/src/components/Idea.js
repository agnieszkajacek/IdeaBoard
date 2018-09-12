import React, { Component } from 'react'
import '../App.css';
class Idea extends Component {

  handleClick = (e) => {
    this.props.onClick(this.props.idea.id, e.target.dataset.type)
  } 
  
  render(){
    const {idea} = this.props;

    return (
      <div className="brick" key={idea.id}>
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
