import { useEffect, useState } from 'react'

import './Checkbox.css'

type Props = {
    state: Array<string>,
    setState: Function,
    id: string
}

export default function Checkbox({ state, setState, id } : Props) {
    const [ticked, setTicked] = useState<boolean>(false);

    useEffect(() => {
        if (ticked) {
            const newState: Array<string> = [...state];
            newState.push(id);
            setState(newState);
        } else {
            const newState: Array<string> = [...state];
            newState.splice(newState.findIndex((element) => element === id))
            setState(newState);
        }
    }, [ticked])

    return (
        <div className="checkbox" id={`checkbox-${id}`} onClick={() => setTicked(!ticked)}>{ticked && "X"}</div>
    )
}