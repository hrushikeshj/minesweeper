import React from 'react';

function Block({config, onClick, i, j}){
  let {mine, val, shown} = config
  if(mine)
    val = "🤯"

  if(!shown)
    val = ''

  // ({i}, {j}, {val})
  console.log(shown, val)
  return (
    <div className='block' key={`${i}-${j}`} onClick={() => onClick()}>{val}</div>
  );
}

export default Block;
