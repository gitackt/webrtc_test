import React from 'react';
import './App.css';

const App: React.FC = () => {
  const [recording, setRecording] = React.useState(false);
  React.useEffect(() => {
    console.warn(recording);
    if (recording) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: window.innerWidth, height: window.innerHeight },
          audio: true,
        })
        .then((stream) => {
          document.querySelector('video')!.srcObject = stream;
        });
    } else {
      const localStream = document.querySelector('video')!.srcObject;
      if (localStream) {
        const mediaStream = localStream as MediaStream;
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    }
  }, [recording]);
  return (
    <div className="App">
      <video id="video" autoPlay className="videoObject"></video>
      <div className="recordButton" onClick={() => setRecording(!recording)}>
        Record
      </div>
    </div>
  );
};

export default App;
