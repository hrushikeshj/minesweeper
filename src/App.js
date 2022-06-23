import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mine from './Mine'
import CustomizeForm from './CustomizeForm';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ROW: 9,
      COL: 4,
      NO_MINES: 6
    }
  }

  updateCongif(s){
    this.setState(s);
  }

  render(){
    return(
      <>
        <div className='cont'>
          <Mine ROW={this.state.ROW} COL={this.state.COL} NO_MINES={this.state.NO_MINES}/>
        </div>
        <CustomizeForm updateCongif={(r) => this.updateCongif(r)}/>
        {JSON.stringify(this.state)}
      </>
    );
  }
}

export default App;
