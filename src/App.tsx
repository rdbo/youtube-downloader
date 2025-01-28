import { useRef } from 'react';

export default function App() {
  const videoUrlRef = useRef<HTMLInputElement>(null);
  const videoInfoRef = useRef<HTMLSpanElement>(null);

  const getVideoInfo = async () => {
    console.log("Getting video");
    videoInfoRef.current.innerText = "TEST";
  };

  return (
    <main>
      <h1>Test</h1>
      <label>URL: </label>
      <input ref={videoUrlRef}/>
      <button onClick={getVideoInfo}>Get Info</button>
      <span ref={videoInfoRef}></span>
    </main>
  );
}
