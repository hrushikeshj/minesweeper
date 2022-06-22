import React from 'react';

function Block({config, onClick, oMD, i, j}){
  const preventDefault = (e) => { e.preventDefault() }

  let {mine, val, shown, mark} = config
  if(mine)
    val = "🤯"

  if(!shown){
    val = ''
  
    if(mark )
      val = 'x'
  }
  // ({i}, {j}, {val})
  console.log(shown, val)
  return (
    <div onContextMenu={preventDefault} className='block' key={`${i}-${j}`} onClick={() => onClick()} onMouseDown={(e)=>oMD(e)}>{val}</div>
  );
}

export default Block;
