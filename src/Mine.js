import React from 'react';
import Block from './Block'
const ROW = 9;
const COL = 4;
const NO_MINES = 6;

function corner(i, j, m, n){
  if(i == 0)
    if (j == 0 || j == n-1) return true;
  
  if(i == m-1)
    if (j == 0 || j == n-1) return true;

  return false;
}

function neighbours_index(i, j, rowLimit, columnLimit) {

  let ans = []
  for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit-1); x++) {
    for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit-1); y++) {
      if(x !== i || y !== j) {
        ans.push([x, y]);
      }
    }
  }
  return ans;
}

function neighbours(i, j, m, n){
  // m and n size
  /*
  array[i-1][j-1]
  array[i-1][j]
  array[i-1][j+1]

  array[i][j-1]
  array[i][j+1]

  array[i+1][j-1]
  array[i+1][j]
  array[i+1][j+1]
  */

}

class Mine extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        blocks: Array(ROW).fill(Array(COL).fill({mine: false, val: 0, shown: false, mark: false})),
        init: true
      }
  }

  blocks(){
    return JSON.parse(JSON.stringify(this.state.blocks));
  }

  generateMine(i, j){
    let r, c, mines = [`${i}-${j}`], count = 0;
    let blocks = this.blocks();

    blocks[i][j].shown = true;
    //neighbours can't be mine
    for(let [x, y] of neighbours_index(i,j, ROW, COL)){
      blocks[x][y].shown = true
      mines.push(`${x}-${y}`);
    }

    console.log(mines);
    while(count<NO_MINES){
      r = Math.floor(Math.random() * ROW);
      c = Math.floor(Math.random() * COL);
      if(mines.includes(`${r}-${c}`))
        continue;

      blocks[r][c].mine = true;
      mines.push(`${r}-${c}`);

      // incremnt mine val of other blocks
      for(let [x, y] of neighbours_index(r, c, ROW, COL))
        blocks[x][y].val += 1;
      count += 1;
    }
    
    this.setState({blocks: blocks, init: false})
  }

  handelClick(i, j){
    if(this.state.init){
      //alert("init")
      this.generateMine(i, j)
      return;
    }
    console.log(i, j);

    let blocks = this.blocks(), not_shown = 0;
  
    if(!blocks[i][j].shown){
      blocks[i][j].shown = true;
  
      if(blocks[i][j].mine)
        alert("game over");
      else{
        // check the number of not shown mines
        for(const row of blocks)
          for(const b of row)
            if(!b.shown) not_shown += 1;
      }
      // win 
      if((not_shown == NO_MINES) && not_shown != 0)
        alert("Win")
    }

    this.setState({blocks: blocks})
  }

  oMD(e, i, j){
    let blocks = this.blocks();
    if(blocks[i][j].shown) return;

    blocks[i][j].mark = !blocks[i][j].mark;
    if (e.buttons == 2) this.setState({blocks: blocks})
  }

  render() { 
    return (
      <div className='grid'>
      {
        this.state.blocks.map((row, i) => {
          return row.map((s, j) => <Block onClick={()=>this.handelClick(i, j)} oMD={(e) => this.oMD(e, i, j)} config={s} key={`${i}-${j}`} val="4" i={i} j={j}/>)
        })
      }
      </div>
    );
  }
}

export default Mine;
