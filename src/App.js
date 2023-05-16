/** @format */
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [break1, setbreak1] = useState(5);
  const [session, setsession] = useState(25);
  const [start, setstart] = useState(false);
  const [time, setTime] = useState(session * 60);
  const [currentSession, setcurrentSession] = useState(true);

  const timer = (time) => {
    const timeInSeconds = time;
    const min = timeInSeconds >= 60 ? Math.floor(timeInSeconds / 60) : 0;
    const seconds = min !== 0 ? timeInSeconds - min * 60 : timeInSeconds;
    const displayMinutes = min <= 9 ? `0${min}` : `${min}`;
    const displaySeconds = seconds <= 9 ? `0${seconds}` : `${seconds}`;
    return `${displayMinutes}:${displaySeconds}`;
  };

  useEffect(() => {
    currentSession ? setTime(session * 60) : setTime(break1 * 60);
  }, [currentSession, break1, session]);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      if (time > 1) setTime(time - 1);
      if (time === 1) {
        setTime(time - 1);
        document.querySelector("#beep").play();
      }
      if (time === 0) {
        setcurrentSession(!currentSession);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentSession, start, time]);

  const reset = () => {
    document.querySelector("#beep").pause();
    document.querySelector("#beep").currentTime = 0;
    setsession(25);
    setbreak1(5);
    setTime(session * 60);
    setcurrentSession(true);
    setstart(false);
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='conatiner max-w-md grid p-5 bg-zinc-900 text-slate-200'>
        <div className='grid gap-5 p-3'>
          <div className='p-3'>
            <h2 id='break-label' className='text-center'>
              Break Length
            </h2>
            <div className='flex gap-3 py-3 justify-center text-zinc-900'>
              <button
                className='bg-blue-300 px-5 py-2 rounded-md '
                type='button'
                id='break-decrement'
                onClick={() => setbreak1(break1 === 1 ? break1 : break1 - 1)}>
                -
              </button>
              <button
                className='bg-blue-300 px-5 py-2 rounded-md'
                type='button'
                id='break-increment'
                onClick={() => setbreak1(break1 === 60 ? break1 : break1 + 1)}>
                +
              </button>
              <div
                className='bg-stone-200 px-7 py-3 rounded-md text-center'
                id='break-length'>
                {break1}
              </div>
            </div>
          </div>

          <div className='p-3'>
            <h2 id='session-label' className='text-center'>
              Session Length
            </h2>
            <div className='flex gap-3 py-3 justify-center text-zinc-900'>
              <button
                type='button'
                className='bg-blue-300 px-5 py-2 rounded-md'
                id='session-decrement'
                onClick={() =>
                  setsession(session === 1 ? session : session - 1)
                }>
                -
              </button>
              <button
                className='bg-blue-300 px-5 py-2 rounded-md'
                type='button'
                id='session-increment'
                onClick={() =>
                  setsession(session === 60 ? session : session + 1)
                }>
                +
              </button>
              <div
                className='bg-stone-200 px-7 py-3 rounded-md text-center'
                id='session-length'>
                {session}
              </div>
            </div>
          </div>
        </div>

        <div className='h-full p-3 grid place-content-center'>
          <h1 id='timer-label' className='text-center p-3 m-0'>
            {currentSession ? "Session" : "Break"}
          </h1>
          <div
            className='bg-stone-200 text-zinc-900 rounded-md place-content-center h-300 grid p-5'
            id='time-left'>
            {timer(time)}
          </div>
          <div className='flex justify-evenly p-3 text-zinc-900 gap-3'>
            <button
              type='button'
              id='start_stop'
              className='bg-blue-300 px-5 py-2 rounded-md'
              onClick={() => setstart(!start)}>
              {start ? "stop" : "start"}
            </button>
            <button
              className='bg-blue-300 px-5 py-2 rounded-md'
              type='button'
              id='reset'
              onClick={reset}>
              reset
            </button>
          </div>
          <audio id='beep'>
            <source
              src='http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a'
              type='audio/mpeg'></source>
          </audio>
        </div>
      </div>
    </div>
  );
}

export default App;
