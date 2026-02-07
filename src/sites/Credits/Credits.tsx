import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import blobReading from '../../assets/blobhajs/blob_reading.png'

import './Credits.css'

export default function Credits() {
    const navigate: Function = useNavigate();

    return (
        <div id="credits">
            <header>
                <button onClick={() => navigate("/")}>
                    <ArrowLeft
                        color="white"
                        size={50}
                    />
                </button>
            </header>
            <main>
                <img src={blobReading} />
                <div>
                    <p>The <b>Blåhaj</b> (or "Blobhaj") Emojis were made by <b>Heatherhorns</b> and are licensed under <b><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons 4.0 International</a></b>.</p>
                    <br />
                    <p>The <b>Reading Emoji</b> (the one that's spinning while the streams are loading!!) was commissioned by <b><a href="https://wiresandbooks.com/" target="_blank">Rose Davidson</a></b>.</p>
                    <p>The <b>Sad Emoji</b> (the one when no stream was found) was commissioned by <b><a href="https://deadinsi.de/@dafne" target="_blank">Dafne Kiyui</a></b>.</p>
                </div>
            </main>

        </div>
    )
}