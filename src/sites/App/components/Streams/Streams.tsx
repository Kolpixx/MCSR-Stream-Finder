import { useEffect, useState } from 'react'
import axios from 'axios'

import './Streams.css'
import { getDivision } from '../../../../utils'

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

    return (
        <div id="streams">
            {data?.map((stream) => {
                return (
                    <div className="stream-container">
                        <div className="stream-container-top">
                            <img src={stream.twitch.thumbnail_url} className="stream-thumbnail" />
                        </div>
                        <div className="stream-container-bottom">
                            <div>
                                <span>{stream.twitch.display_name}</span>
                                <span>⬦</span>
                                <span>{getDivision(stream.elo)} ({stream.elo})</span>
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
                                <span>Language: {stream.twitch.language}</span>
                                <span>Online For: {stream.twitch.startTimestamp}</span>
                            </div>

                        </div>
                        {/* <iframe src={`https://player.twitch.tv/?channel=${stream.twitch.display_name}&parent=localhost`} allowFullScreen={true} height="180" width="280"></iframe> */}
                    </div>
                )
            })}
        </div>
    )
}