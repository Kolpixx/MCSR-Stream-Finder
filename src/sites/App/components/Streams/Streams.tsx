import type { StreamType } from '../../../../types';
import Stream from './components/Stream';

import './Streams.css'

type Props = {
    results: Array<StreamType>,
    currentTime: Date
}

export default function Streams({ results, currentTime } : Props) {
    const streamPlaceholders: Array<any> = [];

    for (let i = 0; i < 3; i++) {
        streamPlaceholders.push(<div className="stream-placeholder"></div>)
    }

    return (
        <div id="streams">
            {results?.map((stream, index) => {
                return (
                    <Stream key={index} stream={stream} currentTime={currentTime} />
                )
            })}
            {streamPlaceholders}
        </div>
    )
}