import { useState } from 'react';
import { getDivision, padNumber } from '../../../../../utils'
import { Diamond } from 'lucide-react';
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
        const [loadedThumbnail, setLoadedThumbnail] = useState<boolean>(false);
        const [hoverTimer, setHoverTimer] = useState<number>(0);

        const thumbnail = new Image();
        thumbnail.src = stream.twitch.thumbnail_url;
        thumbnail.onload = () => {
            setLoadedThumbnail(true);
        }

        return (
            loadedThumbnail &&
                <div className="stream-container-wrapper">
                    <div className="stream-container" onMouseEnter={() => setHoverTimer(setTimeout(() => showStream(true), 1000))} onMouseLeave={() => {clearTimeout(hoverTimer); setHoverTimer(0); showStream(false);}}>
                        <div className="stream-container-top">
                            <img onClick={() => window.open(stream.url, "_blank")} style={{visibility: showingStream ? "hidden" : "initial"}} onLoad={() => setLoadedThumbnail(true)} src={thumbnail.src} className="stream-thumbnail pointer" />
                            {(showingStream && hoverTimer !== 0) &&
                                <iframe className="stream-iframe" style={{visibility: showingStream ? "initial" : "hidden"}} src={`https://player.twitch.tv/?channel=${stream.twitch.display_name}&parent=${window.location.hostname}`} allowFullScreen={true} width="100%" height="100%" frameBorder="0" ></iframe>
                            }
                        </div>
                        <div className="stream-container-bottom">
                            <div className="stream-container-basic-info">
                                <a className="stream-container-url pointer" href={stream.url} target="_blank">{stream.twitch.display_name}</a>
                                {stream.elo !== undefined &&
                                    <>
                                        <Diamond className={`${getDivision(stream.elo, false)}-diamond`} strokeWidth={2.5} size={16} style={{stroke: "linear"}} />
                                        <span className={`${getDivision(stream.elo, false)}-elo stream-information-elo`}>{getDivision(stream.elo, true)} ({stream.elo})</span>
                                    </>
                                }

                            </div>
                            <div className="divider" />
                            <div className="stream-container-twitch-info">
                                <span><a className="stream-container-twitch-info-label">Language:</a> {stream.twitch.language !== undefined ? languageName.of(stream.twitch.language) : "/"}</span>
                                <span><a className="stream-container-twitch-info-label">Viewers:</a> {stream.twitch.viewers}</span>
                                <span><a className="stream-container-twitch-info-label">Online For:</a> {padNumber(Math.floor((elapsedTime / (60 * 60))), 2)}:{padNumber(Math.floor((elapsedTime / 60) % 60), 2)}h</span>
                                <div className="stream-tags-container">
                                    <span className="stream-container-twitch-info-label">Tags</span>
                                    <div className="stream-tags">
                                        {stream.twitch.tags !== null ?
                                            stream.twitch.tags?.map((tag, index) => {
                                                return <div key={index} className="stream-tag">{tag}</div>;
                                            })
                                            :
                                            <div className="stream-tag">No Tags :/</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
}