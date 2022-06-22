import React from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends React.Component{
  render(){
      return(
        <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
        </button>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0
    }
  }

  increment(){
    this.setState({
      count: this.state.count + 1
    })
  }

  render(){
    return(
      <>
        <h1>hrushi</h1>
        <Button value="Click me" onClick={() => this.increment()}/>
        {this.state.count}
      </>
      
    );
  }
}

//export default App;
