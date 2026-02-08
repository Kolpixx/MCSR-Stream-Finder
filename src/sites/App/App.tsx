import { useEffect, useState } from 'react';
import type { StreamType } from '../../types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Streams from './components/Streams/Streams';
import Options from './components/Options/Options';
import blobReading from '../../assets/blobhajs/blob_reading.png'
import blobSadReaching from '../../assets/blobhajs/blob_sad-reaching.png'

import './App.css'

export default function App() {
    const backendUrl: string = import.meta.env.VITE_REACT_APP_BACKEND_URL || "localhost";
    const backendPort: string = import.meta.env.VITE_REACT_APP_BACKEND_PORT || "3000";

    const [data, setData] = useState<Array<StreamType>>([]);
    const [results, setResults] = useState<Array<StreamType>>([]);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [finishedAPICall, setFinishedAPICall] = useState<boolean>(false);

    let attempts: number = 0;

    setTimeout(() => {
        setCurrentTime(new Date());
    }, 1000);

    async function callAPI() {
        if (attempts < 4) { // I don't know why the attempts increase like two times after loading the page ;-;
            attempts++;
            axios.get(`${backendUrl}:${backendPort}/getstreams`)
                .then((response) => {
                    setFinishedAPICall(true);
                    setData(response.data);
                    setResults(response.data.sort((a: { elo: number; }, b: { elo: number; }) => b.elo - a.elo));
                })
                .catch((error) => {
                    setTimeout(() => callAPI(), 2500);
                    throw new Error(error.message);
                });
        } else {
            setFinishedAPICall(true);
            throw new Error("Couldn't fetch data from API after 3 attempts");
        }
    }

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <div id="app">
            <header>
                <h1>MCSR Stream Finder</h1>
            </header>
            <main>
                <Options data={data} results={results} setResults={setResults} />
                {finishedAPICall ?
                    results.length > 0 ? <Streams currentTime={currentTime} results={results} />
                    :
                    <div id="no-streams-found">
                        <img src={blobSadReaching} />
                        <span>No Streams Found</span>
                    </div>
                    :
                    <div id="streams-loading">
                        <img src={blobReading} />
                        <span>Loading...</span>
                    </div>
                }

            </main>
            <footer>
                <Link to="/credits">Credits</Link>
                <p>Made with 💚 by <a href="https://github.com/Kolpixx" target="_blank">Kolpix</a></p>
                <a href="https://github.com/Kolpixx/MCSR-Stream-Finder" target="_blank">Source Code</a>
            </footer>
        </div>
    )
}