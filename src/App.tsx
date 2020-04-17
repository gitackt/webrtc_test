import React from 'react';
import './App.css';
import { createConnection, startPeer, stopPeer } from './lib/peerConnection';
import { getMediaStream } from './lib/mediaStream';

const App: React.FC = () => {
  const [recording, setRecording] = React.useState(false);
  const [pc] = React.useState(createConnection());

  React.useEffect(() => {
    if (recording) {
      getMediaStream(navigator).then((stream) =>
        startPeer(pc, stream, document)
      );
      pc.addEventListener('icecandidate', (ev) => {
        if (ev.candidate !== null) {
        }
      });
    } else {
      stopPeer(document);
    }
  }, [pc, recording]);

  return (
    <div className="App">
      <video autoPlay className="videoObject" id="localVideo"></video>
      <video autoPlay className="videoObject" id="remoteVideo"></video>
      <div className="recordButton" onClick={() => setRecording(!recording)}>
        Record
      </div>
    </div>
  );
};

export default App;
