import React from 'react';
import useSound from 'use-sound';
import chessMove from '../../../assets/media/chess-move.mp3';
import {useParams} from 'react-router-dom';
import {ColorContext} from '../../../context/colorcontext';
import VideoChat from '../../video-chat';
import {Chessboard} from '../components/Chessboard';
export const socket = require('../../../utils/socket').socket;

const ChessGameWrapper = props => {
  /**
   * player 1
   *      - socketId 1
   *      - socketId 2 ???
   * player 2
   *      - socketId 2
   *      - socketId 1
   */

  // get the gameId from the URL here and pass it to the chessGame component as a prop.
  const domainName = 'http://localhost:3000';
  const color = React.useContext(ColorContext);
  const {gameid} = useParams();
  const [play] = useSound(chessMove);
  const [opponentSocketId, setOpponentSocketId] = React.useState('');
  const [opponentDidJoinTheGame, didJoinGame] = React.useState(false);
  const [opponentUserName, setUserName] = React.useState('');
  const [gameSessionDoesNotExist, doesntExist] = React.useState(false);

  React.useEffect(() => {
    socket.on('playerJoinedRoom', statusUpdate => {
      console.log(
        'A new player has joined the room! Username: ' +
          statusUpdate.userName +
          ', Game id: ' +
          statusUpdate.gameId +
          ' Socket id: ' +
          statusUpdate.mySocketId
      );
      if (socket.id !== statusUpdate.mySocketId) {
        setOpponentSocketId(statusUpdate.mySocketId);
      }
    });

    socket.on('status', statusUpdate => {
      console.log(statusUpdate);
      alert(statusUpdate);
      if (
        statusUpdate === 'This game session does not exist.' ||
        statusUpdate === 'There are already 2 people playing in this room.'
      ) {
        doesntExist(true);
      }
    });

    socket.on('start game', opponentUserName => {
      console.log('START!');
      if (opponentUserName !== props.myUserName) {
        setUserName(opponentUserName);
        didJoinGame(true);
      } else {
        // in chessGame, pass opponentUserName as a prop and label it as the enemy.
        // in chessGame, use reactContext to get your own userName
        // socket.emit('myUserName')
        socket.emit('request username', gameid);
      }
    });

    socket.on('give userName', socketId => {
      if (socket.id !== socketId) {
        console.log('give userName stage: ' + props.myUserName);
        socket.emit('recieved userName', {userName: props.myUserName, gameId: gameid});
      }
    });

    socket.on('get Opponent UserName', data => {
      if (socket.id !== data.socketId) {
        setUserName(data.userName);
        console.log('data.socketId: data.socketId');
        setOpponentSocketId(data.socketId);
        didJoinGame(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      {opponentDidJoinTheGame ? (
        <div>
          <h4> Opponent: {opponentUserName} </h4>
          <div style={{display: 'flex'}}>
            <Chessboard playAudio={play} gameId={gameid} color={color.didRedirect} />
            <VideoChat
              mySocketId={socket.id}
              opponentSocketId={opponentSocketId}
              myUserName={props.myUserName}
              opponentUserName={opponentUserName}
            />
          </div>
          <h4> You: {props.myUserName} </h4>
        </div>
      ) : gameSessionDoesNotExist ? (
        <div>
          <h1 style={{textAlign: 'center', marginTop: '200px'}}> :( </h1>
        </div>
      ) : (
        <div>
          <h1
            style={{
              textAlign: 'center',
              marginTop: String(window.innerHeight / 8) + 'px'
            }}>
            Hey <strong>{props.myUserName}</strong>, copy and paste the URL below to send to your
            friend:
          </h1>
          <textarea
            style={{
              marginLeft: String(window.innerWidth / 2 - 290) + 'px',
              marginTop: '30' + 'px',
              width: '580px',
              height: '30px'
            }}
            onFocus={event => {
              console.log('sd');
              event.target.select();
            }}
            value={domainName + '/game/' + gameid}
            type="text"></textarea>
          <br></br>

          <h1 style={{textAlign: 'center', marginTop: '100px'}}>
            {' '}
            Waiting for other opponent to join the game...{' '}
          </h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChessGameWrapper;
