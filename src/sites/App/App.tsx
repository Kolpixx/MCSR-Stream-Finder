import { useEffect, useState } from 'react';
import type { StreamType } from '../../types';
import axios from 'axios';
import Streams from './components/Streams/Streams';
import Options from './components/Options/Options';

import './App.css'

export default function App() {
    const backendUrl: string = "localhost";
    const backendPort: string = "3000";

    const [data, setData] = useState<Array<StreamType>>([]);
    const [results, setResults] = useState<Array<StreamType>>([]);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    setTimeout(() => {
        setCurrentTime(new Date());
    }, 1000);

    useEffect(() => {
        axios.get(`http://${backendUrl}:${backendPort}/getstreams`)
            .then((response) => {
                setData(response.data);
                setResults(response.data.sort((a: { elo: number; }, b: { elo: number; }) => b.elo - a.elo));
            })
            .catch((error) => {
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
                <Streams currentTime={currentTime} results={results} />
            </main>
            <footer>
                <p id="footer-text">Made with 💚 by <a href="https://github.com/Kolpixx" target="_blank">Kolpix</a></p>
            </footer>
        </div>
    )
}