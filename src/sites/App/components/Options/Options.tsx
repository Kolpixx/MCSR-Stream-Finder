import { useEffect, useState } from 'react';
import { divisionsMap } from '../../../../consts';
import type { StreamType } from '../../../../types'
import Dropdown from './components/Dropdown/Dropdown';

import './Options.css'

type Props = {
    data: Array<StreamType>,
    setResults: Function
}

export default function Options({ data, setResults } : Props) {
    const languageName = new Intl.DisplayNames(["en"], { type: "language"});
    const languages: Map<string, number> = new Map();

    // States for the filter options
    const [filterLanguages, setFilterLanguages] = useState<Array<string>>([]);
    const [filterDivisons, setFilterDivisions] = useState<Array<string>>([]);

    // Add all the languages, that are currenty being streamed in, into the languages Map.
    data.forEach((stream) => {
        languages.set(stream.twitch.language, 1);
    });

    const languageOptionsMap: Map<string, string | undefined> = new Map();
    [...languages.keys()].forEach((language) => {
        languageOptionsMap.set(language, languageName.of(language));
    });

    const divisionOptionsMap: Map<string, string | undefined> = new Map();
    [...divisionsMap.keys()].forEach((division) => {
        divisionOptionsMap.set(division, division);
    })

    useEffect(() => {
        let newResults: Array<StreamType> = [...data];

        if (filterLanguages.length !== 0) {
            newResults.filter((stream) => !filterLanguages.includes(stream.twitch.language)).forEach(() => {
                newResults.splice(newResults.findIndex((stream) => !filterLanguages.includes(stream.twitch.language)), 1);
            })
        }
        
        if (filterDivisons.length !== 0) {
            newResults.filter((stream) => !filterDivisons.includes(stream.division)).forEach(() => {
                newResults.splice(newResults.findIndex((stream) => !filterDivisons.includes(stream.division)), 1);
            })
        }

        setResults(newResults);
    }, [filterLanguages, filterDivisons]);

    return (
        <div id="options">
            <Dropdown
                label="Language"
                id="options-language"
                options={languageOptionsMap}
                state={filterLanguages}
                setState={setFilterLanguages}
            />
            <Dropdown
                label="division"
                id="options-division"
                options={divisionOptionsMap}
                state={filterDivisons}
                setState={setFilterDivisions}
            />
        </div>
    )
}