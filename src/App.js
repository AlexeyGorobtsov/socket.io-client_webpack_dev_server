import React, {useEffect}  from 'react';
import useSocket from "./hooks/useSocket";

// 42["message",{"user_type":"partner_web","chat_id":822,"invite_uuid":"ed5c36da8872431ebf62325f03442b2e","text":"s"}]

const inviteUuid = 'ed5c36da8872431ebf62325f03442b2e';
const chatId = 822;

const App = (props) => {

  const socket = useSocket(inviteUuid);

  useEffect(() => {
    if(socket && typeof socket === 'object') {

      socket.emit('join', {
        'user_type': 'partner_web',
        'chat_id': chatId,
        'invite_uuid': inviteUuid,
      });

      socket.on('user joined', function (user) {
        if(user && 'user_id' in user) {
          console.log({user})
        }
      });

      socket.on('history', function (history) {
        const {messages} = history || {};
        if(Array.isArray(messages) && messages.length > 0) {
          console.log({"history": messages})
        }
      });

      socket.on('message', function (msg){
        if(msg && 'text' in msg && 'user_name' in msg) {
          console.log({message: msg});
        }
      });
    }
  }, [
    socket,
  ]);


  return(
      <div>Hello world!</div>
  )
};

export default App;
