import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Idea from './Idea'
import IdeaForm from './IdeaForm'

class IdeasContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json').then(response => {
      console.log(response)
      this.setState({
        ideas: response.data
      })
    }).catch(error => console.log(error))
  }
  
  addNewIdea = () => {
    axios.post('http://localhost:3001/api/v1/ideas', 
      {
        idea: {
          title: '',
          body: ''
        }
      }
    ).then(response => {
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    }).catch(error => console.log(error))
  }

  updateIdea = (idea) => {
    const {ideas} = this.state;

    const ideaIndex = ideas.findIndex(
      (i) => i.id === idea.id
    )

    const allIdeas = update(ideas, {
      [ideaIndex]: { $set: idea }
    })

    this.setState({
      ideas: allIdeas,
      notification: 'All changes saved'
    })
  }

  enableEditing = (id, type) => {
    this.setState({
      editingIdeaId: id
    }, 
      () => {
        if (type === "title")
          this.title.focus()
        else
          this.body.focus()
      }
    )
  }

  resetNotification = () => {
    this.setState({notification: ''})
  }

  deleteIdea = (id) => {
    axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
    .then(response => {
      console.log(response)
      
      const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
      const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]})

      this.setState({
        ideas: ideas
      })
    })
    .catch(error => console.log(error))
  }

  render(){
    const {ideas, editingIdeaId, notification} = this.state;
    
    return (
      <div>
        <div>
          <button className="newIdeaButton" onClick={this.addNewIdea}>
            New Idea
          </button>
          <span className="notification">
            {notification}
          </span>
        </div>
        {ideas.map((idea) => {
          if(editingIdeaId === idea.id){
            return(<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification} titleRef={input => this.title = input} bodyRef={input => this.body = input} />)
          } else {
            return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.deleteIdea} />)
          }
        })}           
      </div>
    )
  }
}

export default IdeasContainer
