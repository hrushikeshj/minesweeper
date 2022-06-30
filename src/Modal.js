import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import loading_gif from './img/loading.gif';

function randElement(arr){
  const l = Math.floor(Math.random() * arr.length);
  return arr[l];
}

async function getGif(won, setGif){
  const API_KEY = "AIzaSyDTXaAh-5k3ak7d7CJdQyXf3GhPdUC22xM";
  const SEARCH_WIN_Q = ["success", "success", "nailed it", "spot on"];
  const SEARCH_LOST_Q = ["loser", "what a loser", "losers", "what a loser"]

  let SEARCH_Q = "hi";
  if(won)
    SEARCH_Q = randElement(SEARCH_WIN_Q)
  else
  SEARCH_Q = randElement(SEARCH_LOST_Q )

  const url = `https://tenor.googleapis.com/v2/search?q=${SEARCH_Q}&key=${API_KEY}&pos=3&limit=400&random=true`
  const respose = await fetch(url);

  const { results } = await respose.json();
  
  setGif(randElement(results).media_formats["gif"].url)
}
export default function M_odal({ game_state, id}) {
  const [show, setShow] = useState(false);
  const [gif, setGif] = useState(loading_gif);

  const handleClose = () => {
    setShow(false);
    setGif(loading_gif)
  }

  const handleShow = () =>{
    setShow(true);
    getGif(game_state == 'won', setGif)
  }

  useEffect(() => {
    if(game_state != 'playing') handleShow()
    else handleClose()
  }, [game_state]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{game_state == 'won' ? "You Won" : "You Lost"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center"><img style={{maxWidth: "400px"}} src={gif}></img></p>
          
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'center'}}>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
