import React from 'react';
import useLongPress from "./hook/useLongPress";

function Block({config, onClick, oMD, i, j}){
  const preventDefault = (e) => { e.preventDefault() }

  //start
  const onLongPress = () => {
    alert("akdk")
  };

  //const onClick1 = () => {
  //    alert("f")
  //}

  const defaultOptions = {
      shouldPreventDefault: false,
      delay: 500,
  };
  const longPressEvent = useLongPress(() => oMD({buttons: 2}), ()=>{}, defaultOptions);
  //end

  let {mine, val, shown, mark} = config, colour, bg;
  if(mine)
    val = "🤯"

  if(!shown){
    val = ''
  
    if(mark )
      val = "🚩"
  }
  else{
    if(val == 0) val = ""
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
        { val }  
      </div>
    </div>
  );
}

export default Block;
