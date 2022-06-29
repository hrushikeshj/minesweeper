import React from 'react';

import {DEFAULT_VAL, DEFAULT_CSS} from './constant'

class CustomizeForm extends React.Component {
  constructor(props) {
    super(props);
    let css = {}

    this.state = {...DEFAULT_CSS, ...this.props.state};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetVal(){
    this.setState({...DEFAULT_VAL, ...DEFAULT_CSS})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.no_mines < this.state.row * this.state.col)
      this.props.updateCongif({ROW: this.state.row, COL: this.state.col, NO_MINES: this.state.no_mines}, 
        {gl: this.state.gl, gd: this.state.gd, bl: this.state.bl, bd: this.state.bd, size: this.state.size})
    else
      alert("Number of should be less than " + this.state.row * this.state.col)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="row" className="form-label">Row</label>
          <input type="number" name="row" className="form-control" id="row" value={this.state.row} onChange={this.handleInputChange}/>
        </div>

        <div className="col-md-6">
          <label htmlFor="col" className="form-label">Col</label>
          <input type="number" name="col" className="form-control" id="col" value={this.state.col} onChange={this.handleInputChange}/>
        </div>

        <div className="col-md-6">
          <label htmlFor="cno_mines" className="form-label">Mines🚩</label>
          <input type="number" name="no_mines" className="form-control" id="no_mines" value={this.state.no_mines} onChange={this.handleInputChange}/>
        </div>

        <div className="col-md-6">
          <label htmlFor="size" className="form-label">Block Size</label>
          <div className="input-group mb-3">
            <input type="number" className="form-control" name="size" id="size" value={this.state.size} onChange={this.handleInputChange}/>
            <span className="input-group-text" id="basic-addon2">px</span>
          </div>
        </div>

        <div className="col-md-6 row colour">
          <label className="form-label">Hidden Block Colour</label>
          <hr/>
          <div className="col-6">
            <label className="form-label">Light</label>
            <input type="color" className="form-control form-control-color" id="gl" name="gl" value={this.state.gl} onChange={this.handleInputChange} title="Choose your color"/>
          </div>

          <div className="col-6">
            <label className="form-label">Dark</label>
            <input type="color" className="form-control form-control-color" id="gd" name="gd" value={this.state.gd} onChange={this.handleInputChange} title="Choose your color"/>
          </div>
        </div>

        <div className="ml-1 col-md-6 row colour">
          <label className="form-label">Shown Block Colour</label>
          <hr/>
          <div className="col-6">
            <label className="form-label">Light</label>
            <input type="color" className="form-control form-control-color" id="bl" name="bl" value={this.state.bl} onChange={this.handleInputChange} title="Choose your color"/>
          </div>

          <div className="col-6">
            <label className="form-label">Dark</label>
            <input type="color" className="form-control form-control-color" id="bd" name="bd" value={this.state.bd} onChange={this.handleInputChange} title="Choose your color"/>
          </div>
        </div>
        <p className='text-center'>
          <button type="submit" className="btn btn-primary">Apply</button>
          <a style={{marginLeft: '10px'}} href="#!" onClick={() => this.resetVal()} className="btn btn-danger">Reset</a>
        </p>
      </form>
    );
  }
}

export default CustomizeForm;

/*
<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      */