import React, { Component } from "react";
import Auxillary from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
//statefull component

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7

}
class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  state = {
    ingredients: {
      //adding Key-value pairs
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0, 
    },
    totalPrice: 4,
    purchaseable: false
  }
//function
  updatePurchaseState (ingredients) {

    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0});
  }


  addIngredientHandeler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }


  render() {
    
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      //build control handlers

      <Auxillary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
        ingredientRemoved={this.removeIngredientHandler}
        indgredientAdded={this.addIngredientHandeler} 
        disabled={disabledInfo}
        purchaseable={this.state.purchaseable}
        price={this.state.totalPrice}/>
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
