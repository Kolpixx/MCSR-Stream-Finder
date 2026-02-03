import { useState } from 'react';
import Checkbox from '../../../../../../components/Checkbox/Checkbox'

import './Dropdown.css'

type Props = {
    id: string,
    label: string,
    options: Map<string, string | undefined>,
    state: Array<string>;
    setState: Function
}

export default function Dropdown({ id, label, options, state, setState } : Props) {
    const [showingDropdown, showDropdown] = useState<boolean>(false);

    return (
        <div className="dropdown-wrapper" id={id}>
            <div className="dropdown-label-wrapper" onClick={() => showDropdown(!showingDropdown)}>
                <span className="dropdown-label">{label}</span>
            </div>
            {showingDropdown &&
                <div className="dropdown-options">
                    {Array.from(options).map((option, index) => {
                        return (
                            <div className="dropdown-option" key={index}>
                                <Checkbox
                                    id={option[0]}
                                    state={state}
                                    setState={setState}
                                />
                                <span>{option[1]}</span>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}