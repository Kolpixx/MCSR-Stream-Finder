import { useEffect, useState } from 'react'
import type { StreamType } from '../../../../types';
import axios from 'axios'
import Stream from './components/Stream';

import './Streams.css'

export default function Streams() {
    const backendUrl: string = "localhost";
    const backendPort: string = "3000";
    
    const [data, setData] = useState<Array<StreamType>>();
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        axios.get(`http://${backendUrl}:${backendPort}/getstreams`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, []);

    setTimeout(() => {
        setCurrentTime(new Date());
    }, 1000);

    return (
        <div id="streams">
            {data?.map((stream, index) => {
                return (
                    <Stream key={index} stream={stream} currentTime={currentTime} />
                )
            })}
        </div>
    )
}