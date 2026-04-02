import { useEffect, useState } from 'react';
import { getDivision, padNumber } from '../../../../../utils'
import { ChartNoAxesCombined, Diamond } from 'lucide-react';
import { type StreamType, type StatsObjectType } from '../../../../../types';

import './Stream.css'
import axios from 'axios';

type Props = {
    stream: StreamType,
    currentTime: Date
}

export default function Stream({ stream, currentTime }: Props) {
    const backendUrl: string = import.meta.env.VITE_REACT_APP_BACKEND_URL || "localhost";
    const backendPort: string = import.meta.env.VITE_REACT_APP_BACKEND_PORT || "3000";

    const startTimestamp = new Date(stream.twitch.startTimestamp);
    const elapsedTime: number = (currentTime.getTime() - startTimestamp.getTime()) / 1000; // <- Elapsed time in seconds
    const languageName = new Intl.DisplayNames(["en"], { type: "language" });

    const [showingStream, showStream] = useState<boolean>(false);
    const [loadedThumbnail, setLoadedThumbnail] = useState<boolean>(false);
    const [hoverTimer, setHoverTimer] = useState<number>(0);
    const [userStats, setUserStats] = useState<StatsObjectType | undefined>(undefined);
    const [showingStats, showStats] = useState(false);

    const thumbnail = new Image();
    thumbnail.src = stream.twitch.thumbnail_url;
    thumbnail.onload = () => {
        setLoadedThumbnail(true);
    }

    async function getStats() {
        axios.get(`${backendUrl}:${backendPort}/getStats?user=${stream.uuid}`)
            .then((response) => {
                setUserStats(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    useEffect(() => {
        if (userStats === undefined && showingStats === true) {
            getStats();
        }
    }, [showingStats]);

    return (
        loadedThumbnail &&
        <div className="stream-container-wrapper"  onMouseEnter={() => setHoverTimer(setTimeout(() => showStream(true), 1000))} onMouseLeave={() => { clearTimeout(hoverTimer); setHoverTimer(0); showStream(false); }}>
            <div className="stream-container">
                <div className="stream-container-top">
                    <img onClick={() => window.open(stream.url, "_blank")} style={{ visibility: showingStream ? "hidden" : "initial" }} onLoad={() => setLoadedThumbnail(true)} src={thumbnail.src} className="stream-thumbnail pointer" />
                    {(showingStream && hoverTimer !== 0) &&
                        <iframe className="stream-iframe" style={{ visibility: showingStream ? "initial" : "hidden" }} src={`https://player.twitch.tv/?channel=${stream.twitch.display_name}&parent=${window.location.hostname}`} allowFullScreen={true} width="100%" height="100%" frameBorder="0" ></iframe>
                    }
                </div>
                <div className="stream-container-bottom">
                    <div className="stream-container-basic-info">
                        <div>
                            <a className="stream-container-url pointer" href={stream.url} target="_blank">{stream.twitch.display_name}</a>
                            {stream.elo !== undefined &&
                                <>
                                    <Diamond className={`${getDivision(stream.elo, false)}-diamond`} strokeWidth={2.5} size={16} style={{ stroke: "linear" }} />
                                    <span className={`${getDivision(stream.elo, false)}-elo stream-information-elo`}>{getDivision(stream.elo, true)} ({stream.elo})</span>
                                </>
                            }
                        </div>
                        <button className="mcsr-stats-button" onClick={() => showStats(!showingStats)}><ChartNoAxesCombined size={28} strokeWidth={1.5} /></button>
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
            {(showingStats && userStats !== undefined) &&
                <div className="stats-container">
                    <div className="stats-general">
                        <img src={`https://mc-heads.net/avatar/${stream.uuid}/128`} />
                        <div>
                            <p>{stream.nickname}</p>
                            {stream.elo !== undefined &&
                                <div className="stats-elo">
                                    <Diamond className={`${getDivision(stream.elo, false)}-diamond`} strokeWidth={2.5} size={16} style={{ stroke: "linear" }} />
                                    <span className={`${getDivision(stream.elo, false)}-elo stream-information-elo`}>{getDivision(stream.elo, true)} ({stream.elo}) | #{userStats.leaderboard}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <p>Total Statistics:</p>
                        <ul>
                            <li>Personal Best: {Math.floor(userStats.personalBest / 60)}m {Math.floor(userStats.personalBest % 60)}s</li>
                            <li>Playtime: {Math.floor(userStats.playTime / 60 / 60)}h {Math.floor((userStats.playTime / 60) % 60)}m</li>
                            <li>Matches: {Math.floor(userStats.matches)}</li>
                            <li>Winrate: {Math.floor(userStats.wins / userStats.matches * 100)}% ({userStats.wins}W {userStats.matches - userStats.wins}L)</li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}