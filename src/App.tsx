import { invoke } from '@tauri-apps/api/core';
import { useRef } from 'react';

export default function App() {
  const videoUrlRef = useRef<HTMLInputElement>(null);
  const videoInfoRef = useRef<HTMLSpanElement>(null);

  const getVideoInfo = async () => {
    console.log("Getting video info");
    const result = await invoke('test_command', { video_url: videoUrlRef.current.value });
    console.log(result);
    videoInfoRef.current.innerText = result;
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
