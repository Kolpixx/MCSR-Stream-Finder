import { useEffect, useState } from 'react'
import { getDivision, padNumber } from '../../../../utils'
import axios from 'axios'

import './Streams.css'

type Stream = {
    country: string,
    elo: number,
    nickname: string,
    url: string,
    uuid: string,
    twitch: TwitchObject
}

type TwitchObject = {
    display_name: string,
    pfpURL: string,
    tags: Array<string>,
    viewers: number
    thumbnail_url: string,
    language: string,
    twitch_name: string,
    startTimestamp: string
}

export default function Streams() {
    const backendUrl: string = "localhost";
    const backendPort: string = "3000";
    
    const [data, setData] = useState<Array<Stream>>();
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    const languageName = new Intl.DisplayNames(["en"], { type: "language"});

    useEffect(() => {
        axios.get(`http://${backendUrl}:${backendPort}/getstreams`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    setTimeout(() => {
        setCurrentTime(new Date());
    }, 1000);

    return (
        <div id="streams">
            {data?.map((stream) => {
                const startTimestamp = new Date(stream.twitch.startTimestamp);
                const elapsedTime: number = (currentTime.getTime() - startTimestamp.getTime()) / 1000; // <- Elapsed time in seconds

                return (
                    <div className="stream-container">
                        <div className="stream-container-top">
                            <img src={stream.twitch.thumbnail_url} className="stream-thumbnail" />
                        </div>
                        <div className="stream-container-bottom">
                            <div>
                                <a className="stream-container-url" href={stream.url} target="_blank">{stream.twitch.display_name}</a>
                                {stream.elo !== undefined &&
                                    <>
                                        <span>⬦</span>
                                        <span className={`${getDivision(stream.elo, false)}-elo`}>{getDivision(stream.elo, true)} ({stream.elo})</span>
                                    </>
                                }

                            </div>
                            <div className="divider" />
                            <div className="stream-container-twitch-info">
                                <div>
                                    <span>Tags</span>
                                    <div className="stream-tags">
                                        {stream.twitch.tags?.map((tag) => {
                                            return <div className="stream-tag">{tag}</div>;
                                        })}
                                    </div>
                                </div>
                                <span>Language: {languageName.of(stream.twitch.language)}</span>
                                <span>Online For: {padNumber(Math.floor((elapsedTime / (60 * 60))), 2)}:{padNumber(Math.floor((elapsedTime / 60) % 60), 2)}</span>
                            </div>

                        </div>
                        {/* <iframe src={`https://player.twitch.tv/?channel=${stream.twitch.display_name}&parent=localhost`} allowFullScreen={true} height="180" width="280"></iframe> */}
                    </div>
                )
            })}
        </div>
    )
}