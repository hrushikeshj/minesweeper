import React from 'react';

class CustomizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {row: 9, col: 4, no_mines: 6};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.updateCongif({ROW: this.state.row, COL: this.state.col, NO_MINES: this.state.no_mines})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row mb-3 mt-3">
          <label htmlFor="row" className="col-sm-2 col-form-label">Row</label>
          <div className="col-sm-10">
            <input type="number" name="row" className="form-control" id="row" value={this.state.row} onChange={this.handleInputChange}/>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="col" className="col-sm-2 col-form-label">Col</label>
          <div className="col-sm-10">
            <input type="number" name="col" className="form-control" id="col" value={this.state.col} onChange={this.handleInputChange}/>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="cno_mines" className="col-sm-2 col-form-label">Mines🚩</label>
          <div className="col-sm-10">
            <input type="number" name="no_mines" className="form-control" id="no_mines" value={this.state.no_mines} onChange={this.handleInputChange}/>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Apply</button>
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