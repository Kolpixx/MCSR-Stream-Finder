import type { StreamType } from '../../../../types';
import Stream from './components/Stream';

import './Streams.css'

type Props = {
    results: Array<StreamType>,
    currentTime: Date
}

export default function Streams({ results, currentTime } : Props) {
    return (
        <div id="streams">
            {results?.map((stream, index) => {
                return (
                    <Stream key={index} stream={stream} currentTime={currentTime} />
                )
            })}
        </div>
    )
}