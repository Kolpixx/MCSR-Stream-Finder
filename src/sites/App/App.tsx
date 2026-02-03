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
                setResults(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, []);

    return (
        <>
            <Options data={data} setResults={setResults} />
            <Streams currentTime={currentTime} results={results} />
        </>
    )
}