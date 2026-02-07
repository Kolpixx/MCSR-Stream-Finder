import { useState } from 'react';
import Checkbox from '../../../../../../components/Checkbox/Checkbox'

import './Dropdown.css'

type Variant = "radio" | "checkbox" | "sort";

type Props = {
    id: string,
    label: string,
    options: Map<string, string | undefined>,
    state: Array<string> | string;
    setState: Function,
    variant: Variant

    setSortingOrder?: Function;
}

export default function Dropdown({ id, label, options, state, setState, variant, setSortingOrder } : Props) {
    const [showingDropdown, showDropdown] = useState<boolean>(false);

    return (
        <div className="dropdown-wrapper" style={{borderRadius: showingDropdown ? "10px 10px 0 0" : "10px"}} id={id}>
            <div className="dropdown-label-wrapper pointer" onClick={() => showDropdown(!showingDropdown)}>
                <span className="dropdown-label">{label}</span>
            </div>
            {showingDropdown &&
                <>
                    <div className="dropdown-options">
                        {Array.from(options).map((option, index) => {
                            return (
                                <div className="dropdown-option" key={index}>
                                    {(variant === "checkbox" && state instanceof Array) &&
                                        <>
                                            <Checkbox
                                                id={option[0]}
                                                state={state}
                                                setState={setState}
                                            />
                                            <span>{option[1]}</span>
                                        </>
                                    }
                                    {(variant === "sort" || variant === "radio" && typeof state === "string") &&
                                        <button onClick={() => setState(option[0])}>
                                            {option[1]}
                                        </button>
                                    }
                                </div>
                            )
                        })}
                        {(variant === "sort" && setSortingOrder) &&
                            <>
                                <div className="divider" />
                                <div className="dropdown-sort-order">
                                    <button onClick={() => setSortingOrder("ascending")}>Ascending</button>
                                    <button onClick={() => setSortingOrder("descending")}>Descending</button>
                                </div>
                            </>
                        }
                    </div>
                </>
                
            }
        </div>
    )
}