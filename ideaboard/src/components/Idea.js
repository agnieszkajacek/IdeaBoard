import React, { Component } from 'react'
import '../App.css';
class Idea extends Component {

  render(){
    const {idea} = this.props;

    return (
      <div className="brick" key={idea.id}>
        <h4>{idea.title}</h4>
        <p>{idea.body}</p>
      </div>
    );
  }
}

export default Idea
