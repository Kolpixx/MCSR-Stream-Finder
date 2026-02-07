import { useEffect, useState } from 'react';
import type { StreamType } from '../../types';
import axios from 'axios';
import Streams from './components/Streams/Streams';
import Options from './components/Options/Options';
import blobReading from '../../assets/blobhajs/blob_reading.png'
import blobSadReaching from '../../assets/blobhajs/blob_sad-reaching.png'

import './App.css'
import { Link } from 'react-router-dom';

export default function App() {
    const backendUrl: string = "localhost";
    const backendPort: string = "3000";

    const [data, setData] = useState<Array<StreamType>>([]);
    const [results, setResults] = useState<Array<StreamType>>([]);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [finishedAPICall, setFinishedAPICall] = useState<boolean>(false);

    setTimeout(() => {
        setCurrentTime(new Date());
    }, 1000);

    useEffect(() => {
        axios.get(`http://${backendUrl}:${backendPort}/getstreams`)
            .then((response) => {
                setFinishedAPICall(true);
                setData(response.data);
                setResults(response.data.sort((a: { elo: number; }, b: { elo: number; }) => b.elo - a.elo));
            })
            .catch((error) => {
                setFinishedAPICall(true);
                throw new Error(error.message);
            })
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
                <p id="footer-text">Made with 💚 by <a href="https://github.com/Kolpixx" target="_blank">Kolpix</a></p>
            </footer>
        </div>
    )
}