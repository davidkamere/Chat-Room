import React, { useState, useEffect} from "react";

import io from 'socket.io-client';
import './chat.css';

import InfoBar from "../infoBar/infoBar";
import Input from "../Input/input";
import Messages from "../Messages/messages";



let socket;
const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://easy-chat-rooms.herokuapp.com/';

    // function that gets the room and name
    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        const room = queryParams.get('room');
        const name = queryParams.get('name');

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);



        socket.emit('join', {name, room}, () => {

        });



        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT]);

    // Handles new messages
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])







    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }


    return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>

        </div>
    )
}

export default Chat