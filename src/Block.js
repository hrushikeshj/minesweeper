import React from 'react';

function Block({config, onClick, oMD, i, j}){
  const preventDefault = (e) => { e.preventDefault() }

  let {mine, val, shown, mark} = config, colour, bg;
  if(mine)
    val = "🤯"

  if(!shown){
    val = ''
  
    if(mark )
      val = "🚩"
  }

  // ({i}, {j}, {val})
  bg = shown ? "back" : "green"
  if(j%2 == 0)
    colour = i%2 == 0 ? `${bg}-light` : `${bg}-dark`
  else
    colour = i%2 != 0 ? `${bg}-light` : `${bg}-dark`

  return (
    <div onContextMenu={preventDefault} className={`block ${colour}`} key={`${i}-${j}`} onClick={() => onClick()} onMouseDown={(e)=>oMD(e)}>
      <div className='centered-element'>
        { val }  
      </div>
    </div>
  );
}

export default Block;
