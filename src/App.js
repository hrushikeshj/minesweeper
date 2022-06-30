import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mine from './Mine'
import CustomizeForm from './CustomizeForm';
import Modal from './Modal'
import { QueryClient, QueryClientProvider} from 'react-query'
import { DEFAULT_APP_STATE } from './constant'
 
const queryClient = new QueryClient()
 
const colour = {
  gl: '--green-light',
  gd: '--green-dark',
  bl: '--back-light',
  bd: '--back-dark'
}

const Minesweeper_App_State = 'minesweeper-app-state-v2'
class App extends React.Component{

  constructor(props){
    super(props);
    
    if(localStorage.getItem(Minesweeper_App_State))
    this.state = {...JSON.parse(localStorage.getItem(Minesweeper_App_State)), reset: true, game_state: 'playing'}
    else
      this.state = {...DEFAULT_APP_STATE, reset: true, game_state: 'playing'}
    
    this.passToForm = {row: this.state.ROW, col: this.state.COL, no_mines: this.state.NO_MINES}

    if(localStorage.getItem('minesweeper-css-var')){
      let css = JSON.parse(localStorage.getItem('minesweeper-css-var'));
      this.updateCssVar(css)
      this.passToForm = {...this.passToForm, ...css}
    }
  }

  updateCssVar(css_var){
    let r = document.querySelector(':root');
    r.style.setProperty('--size', `${css_var.size}px`);
    
    for(const k in colour){
      r.style.setProperty(colour[k], css_var[k]);
    }
  }

  updateCongif(s, css_var){
    this.setState(s);
    this.updateCssVar(css_var)
  
    // store row, col, no_mine
    localStorage.setItem(Minesweeper_App_State, JSON.stringify(s));
    localStorage.setItem('minesweeper-css-var', JSON.stringify(css_var));
  }

  resetGame(){
    if(this.state.game_state != "playing"){
      this.setState({reset: !this.state.reset, game_state: 'playing'})
      return;
    }

    if(window.confirm("Are you sure?"))
      this.setState({reset: !this.state.reset})
  }

  setGameState(s){
    this.setState({game_state: s})
  }


  render(){
    return(
      <>
        <div className='cont'>
          <Mine ROW={this.state.ROW} COL={this.state.COL} NO_MINES={this.state.NO_MINES} 
            reset={this.state.reset} setGameState={(s) => this.setGameState(s)} game_state={this.state.game_state}/>
        </div>
        { this.state.game_state}

        <p className='text-center mt-3'>
        <button type="button" className="btn btn-outline-warning" id="reset-btn" onClick={()=>this.resetGame()}>Reset</button>
        <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
          </svg> Customize
        </button>
        </p>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Customize</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <CustomizeForm updateCongif={(r, s) => this.updateCongif(r, s)} state={this.passToForm}/>
              </div>
            </div>
          </div>
        </div>
        <Modal id="win" game_state={this.state.game_state}/>
      </>
    );
  }
}

export default App;
