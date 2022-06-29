import React from 'react';
import useLongPress from "./hook/useLongPress";
import { MINE_NUM_COLOR } from "./constant"

function Block({config, onClick, oMD, i, j}){
  const preventDefault = (e) => { e.preventDefault() }

  //const onClick1 = () => {
  //    alert("f")
  //}

  const defaultOptions = {
      shouldPreventDefault: false,
      delay: 500,
  };
  const longPressEvent = useLongPress(() => oMD({buttons: 2}), ()=>{}, defaultOptions);
  //end

  let {mine, val, shown, mark} = config, colour, bg, font_colour='#000';
  if(mine)
    val = "🤯"

  if(!shown){
    val = ''
  
    if(mark)
      val = "🚩"
  }
  else{
    if(val == 0) val = ""
    else font_colour = MINE_NUM_COLOR[val]
  }

  // ({i}, {j}, {val})
  bg = shown ? "back" : "green"
  if(j%2 == 0)
    colour = i%2 == 0 ? `${bg}-light` : `${bg}-dark`
  else
    colour = i%2 != 0 ? `${bg}-light` : `${bg}-dark`

  return (
    <div onContextMenu={preventDefault} {...longPressEvent} className={`block ${colour}`} key={`${i}-${j}`}
      onClick={() => onClick()} onMouseDown={(e)=>oMD(e)}>
      <div className='centered-element'>
        {<span style={(mine || (!shown && mark)) ? {} : {fontWeight: 700, color: font_colour}}>{ val }</span>}
      </div>
    </div>
  );
}

export default Block;
