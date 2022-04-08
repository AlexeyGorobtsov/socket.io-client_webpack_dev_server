import {io} from 'socket.io-client';
import {useEffect, useState} from 'react';

const isDev = process.env.NODE_ENV === 'development';
const uri  = isDev ?  'https://backend.s1327.skipp.dev' : '';

export default function useSocket(inviteUuid) {

  const [socketInstance, setSocketInstance] = useState(false);

  useEffect(() => {
    if(typeof inviteUuid === 'string'){
      const socket = io( uri, {
        'path': '/socket.io',
        'forceNew': true,
        'reconnectionAttempts': 3,
        'timeout': 2000,
        'auth': {
          'invite_uuid': inviteUuid,
          'user_type': 'partner_web',
        },
      });
      setSocketInstance(socket);
    }

  }, [inviteUuid]);

  return socketInstance;
}
