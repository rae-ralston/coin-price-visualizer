import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

/////////////////INFO////////////////////
// This is a reducer. Keys: has a switch
// statement, takes in previous state &
// action as argument,returns new state
// based on input of action.
////////////////////////////////////////
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
// creates Store with Reducer
const store = createStore(counter)

const Counter = ({ value, onIncrement, onDecrement }) => {
  console.log({ value })
  return (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)};

const myRender = () => {
  render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  )
}
store.subscribe(myRender)
myRender() //so that the page displays something at first

registerServiceWorker();
