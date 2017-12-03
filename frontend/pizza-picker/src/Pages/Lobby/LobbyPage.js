import React from 'react'
import './LobbyPage.css'
import axios from 'axios'

class Lobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lobbyId: '',
      ingredients: {
        meats: ['Meats: ', 'pepperoni', 'sausage', 'chicken'],
        vegetables: ['Veggies', 'tomatoes', 'onions', 'olives'],
        dough: ['Doughs: ', 'white', 'whole grain', 'gluten free'],
        cheese: ['Cheeses: ', 'cheddar', 'feta', 'mozzarella'],
        sauces: ['Sauces: ', 'pizzas', 'bbq', 'alfredo']
      },
      numberSlices: 0,
      selectedIngredients: []
    }
  }

  componentWillMount() {
    const currentIngredients = localStorage.getItem('currentIngredients');
    const lobbyId = localStorage.getItem('lobbyId')
    const lobbyList = localStorage.getItem('lobbyId')
    let ingredientsSet = false
    if (currentIngredients !== null) {
      ingredientsSet = true
    }
    this.setState({
      currentIngredients: ingredientsSet ? currentIngredients : [],
      lobbyId,
      lobbyList
    })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      lobbyInfo: nextProps.lobbyInfo
    })
  }

  toggleSelectedItem(e) {
    const { selectedIngredients } = this.state
    const index = selectedIngredients.indexOf(e.target.value)
    if (index > -1) {
      selectedIngredients.splice(index, 1);
    } else {
      selectedIngredients.push(e.target.value)
    }
    this.setState({
      selectedIngredients
    })
  }

  toggleSelectedDough(e) {
    const { selectedIngredients } = this.state
    const index = selectedIngredients.indexOf(e.target.value)
    const doughs = this.state.ingredients.dough
    doughs.forEach(dough => {
      const index = selectedIngredients.indexOf(dough)
      if (index > -1) {
        selectedIngredients.splice(index, 1);
      }
    })
    selectedIngredients.push(e.target.value)
    this.setState({
      selectedIngredients
    })
  }

  renderIngredientType(type) {
    return this.state.ingredients[type].map((ingredient, i) => {
      return (
        <div key={i} className={'ingredient-column' + (i + 1)}>
          {ingredient}
          {i > 0 && type !== 'dough' &&
            <input type="checkbox" selected={this.state.selectedIngredients.includes(ingredient)} value={ingredient} onClick={(e) => this.toggleSelectedItem(e)} />
          }
          {i > 0 && type === 'dough' &&
            <input type="radio" selected={this.state.selectedIngredients.includes(ingredient)} name="dough" value={ingredient} onClick={(e) => this.toggleSelectedDough(e)} />
          }
        </div>
      );
    })
  }

  submitPizza() {
    localStorage.removeItem('lobbyId')
    this.props.setPage('home')
  }
  
  render() {
    return (
      <div className="lobby-page">
        <div className="top-wrapper">
          <p className="intro">Time to pick your ideal pizza!</p>
          <div className="lobby-i">
            Lobby ID: {this.state.lobbyId}
          </div>
        </div>
        <div className="menu-contents">
          <div className="menu-grid">
            <p className="hungry-text">How hungry are you?</p>
            <div className="counter">
              # of slices: 
              <input type="number" defaultValue={this.state.numberSlices} className="slice-count" onChange={(e) => this.setState({ numberSlices: e.target.value })} />
            </div>
            <div className="ingredients-header">Pick your ingredients!</div>
          </div>
          <div className="ingredient-picker">
            {this.renderIngredientType('dough')}
            {this.renderIngredientType('meats')}
            {this.renderIngredientType('vegetables')}
            {this.renderIngredientType('cheese')}
            {this.renderIngredientType('sauces')}
          </div>
          <center><button onClick={() => this.submitPizza()}>Submit</button></center>
        </div>
      </div>
    );
  }

}

export default Lobby
