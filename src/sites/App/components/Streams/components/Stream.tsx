import { useState } from 'react';
import { getDivision, padNumber } from '../../../../../utils'
import type { StreamType } from '../../../../../types';

import './Stream.css'

type Props = {
    stream: StreamType,
    currentTime: Date
}

export default function Stream({ stream, currentTime } : Props) {
        const startTimestamp = new Date(stream.twitch.startTimestamp);
        const elapsedTime: number = (currentTime.getTime() - startTimestamp.getTime()) / 1000; // <- Elapsed time in seconds
        const languageName = new Intl.DisplayNames(["en"], { type: "language"});

        const [showingStream, showStream] = useState<boolean>(false);

        return (
            <div className="stream-container" onMouseEnter={() => showStream(true)} onMouseLeave={() => showStream(false)}>
                <div className="stream-container-top">
                    {showingStream ?
                        <iframe className="stream-iframe" src={`https://player.twitch.tv/?channel=${stream.twitch.display_name}&parent=localhost`} width="100%" height="100%" allowFullScreen={true} frameBorder="0" ></iframe>
                        :
                        <img src={stream.twitch.thumbnail_url} className="stream-thumbnail" />
                    }
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
                                {stream.twitch.tags?.map((tag, index) => {
                                    return <div key={index} className="stream-tag">{tag}</div>;
                                })}
                            </div>
                        </div>
                        <span>Language: {stream.twitch.language !== undefined ? languageName.of(stream.twitch.language) : "/"}</span>
                        <span>Viewers: {stream.twitch.viewers}</span>
                        <span>Online For: {padNumber(Math.floor((elapsedTime / (60 * 60))), 2)}:{padNumber(Math.floor((elapsedTime / 60) % 60), 2)}</span>
                    </div>
                </div>
            </div>
        )
}