import { useEffect, useState } from 'react'

import './Checkbox.css'

type Props = {
    state: Array<string>,
    setState: Function,
    id: string
}

export default function Checkbox({ state, setState, id } : Props) {
    const [ticked, setTicked] = useState<boolean>(Boolean(state[state.findIndex((element) => element === id)]));

    useEffect(() => {
        if (Boolean(state[state.findIndex((element) => element === id)]) !== ticked) {
            if (ticked) {
                const newState: Array<string> = [...state];
                newState.push(id);
                setState(newState);
            } else {
                const newState: Array<string> = [...state];
                newState.splice(newState.findIndex((element) => element === id), 1);
                setState(newState);
            }
        }
    }, [ticked])

    return (
        <div className="checkbox pointer" id={`checkbox-${id}`} onClick={() => setTicked(!ticked)} style={{backgroundColor: ticked ? "var(--green)" : "var(--overlay-1)"}}></div>
    )
}