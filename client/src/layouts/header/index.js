import './index.css';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/authentication/authenticationSlice';
import React from 'react';
import {useParams} from 'react-router-dom';
import {socket} from '../../utils/socket';

const Header = props => {
  /**
   * Extract the 'gameId' from the URL.
   * the 'gameId' is the gameRoom ID.
   */
  const {gameid} = useParams();

  /*
  * INTEGRATE REDUX
  const dispatch = useDispatch();
  */

  /**
   * For this browser instance, we want
   * to join it to a gameRoom. For now
   * assume that the game room exists
   * on the backend.
   *
   *
   * TODO: handle the case when the game room doesn't exist.
   */
  socket.emit('playerJoinGame', {
    gameId: gameid,
    userName: props.userName,
    isCreator: props.isCreator
  });

  return (
    <>
      <header>
        <nav>
          <button
            onClick={() => alert('integrate redux!') /*dispatch(logout())*/}
            className="logout-btn"
            type="submit">
            Disconnect
          </button>
        </nav>
      </header>
      <div>
        <h1 style={{textAlign: 'center'}}>Decentralized Chess - Play to earn!</h1>
        <h3 style={{textAlign: 'center'}}>
          A game demonstrating various blockchain capabilities. Checkout its{' '}
          <a href="https://github.com/govindthange/de-chess" target="_blank">
            sourcode
          </a>
          .
        </h3>
        <h3 style={{textAlign: 'center'}}>
          <a href="./" target="_blank">
            New Game
          </a>
          .
        </h3>
      </div>
    </>
  );
};

export default Header;
