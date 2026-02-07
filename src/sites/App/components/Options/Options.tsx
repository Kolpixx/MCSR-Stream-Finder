import { useEffect, useState } from 'react';
import { divisionsMap, sortingOptionsMap } from '../../../../consts';
import type { StreamType } from '../../../../types'
import Dropdown from './components/Dropdown/Dropdown';

import './Options.css'

type Props = {
    data: Array<StreamType>,
    results: Array<StreamType>,
    setResults: Function
}

type SortingOrder = "ascending" | "descending";

export default function Options({ data, results, setResults } : Props) {
    const languageName = new Intl.DisplayNames(["en"], { type: "language"});
    const languages: Map<string, number> = new Map();

    // States for the filter options
    const [filterLanguages, setFilterLanguages] = useState<Array<string>>([]);
    const [filterDivisons, setFilterDivisions] = useState<Array<string>>([]);
    
    // States for sorting the results
    const [sorting, setSorting] = useState<string>("elo");
    const [sortingOrder, setSortingOrder] = useState<SortingOrder>("descending");

    // Add all the languages, that are currenty being streamed in, into the languages Map.
    data.forEach((stream) => {
        languages.set(stream.twitch.language, 1);
    });

    const languageOptionsMap: Map<string, string | undefined> = new Map();
    [...languages.keys()].forEach((language) => {
        language !== undefined && languageOptionsMap.set(language, languageName.of(language));
    });

    const divisionOptionsMap: Map<string, string | undefined> = new Map();
    [...divisionsMap.keys()].forEach((division) => {
        division !== undefined && divisionOptionsMap.set(division, division.charAt(0).toUpperCase() + division.slice(1));
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

        console.log(filterLanguages, filterDivisons);
    }, [filterLanguages, filterDivisons]);

    useEffect(() => {
        const newResuts = [...results];

        switch (sorting) {
            case "elo":
                sortingOrder === "descending" ? newResuts.sort((a, b) => b.elo - a.elo) : newResuts.sort((a, b) => a.elo - b.elo);
                setResults(newResuts);
                break;
            case "viewers":
                sortingOrder === "descending" ? newResuts.sort((a, b) => b.twitch.viewers - a.twitch.viewers) : newResuts.sort((a, b) => a.twitch.viewers - b.twitch.viewers);
                setResults(newResuts);
                break;
            case "duration":
                sortingOrder === "descending" ? newResuts.sort((a, b) => new Date(a.twitch.startTimestamp).getTime() - new Date(b.twitch.startTimestamp).getTime()) : newResuts.sort((a, b) => new Date(b.twitch.startTimestamp).getTime() - new Date(a.twitch.startTimestamp).getTime());
                setResults(newResuts);
                break;
            default:
                sortingOrder === "descending" ? newResuts.sort((a, b) => b.elo - a.elo) : newResuts.sort((a, b) => a.elo - b.elo);
                setResults(newResuts);
                break;
        }
    }, [sorting, sortingOrder])

    return (
        <div id="options">
            <div>
                <Dropdown
                    label="Language"
                    id="options-language"
                    options={languageOptionsMap}
                    state={filterLanguages}
                    setState={setFilterLanguages}
                    variant="checkbox"
                />
                <Dropdown
                    label="Division"
                    id="options-division"
                    options={divisionOptionsMap}
                    state={filterDivisons}
                    setState={setFilterDivisions}
                    variant="checkbox"
                />
            </div>
            <div>
                <Dropdown
                    label="Sort by"
                    id="options-sort"
                    options={sortingOptionsMap}
                    state={sorting}
                    setState={setSorting}
                    variant="sort"
                    sorting={sorting}
                    sortingOrder={sortingOrder}
                    setSortingOrder={setSortingOrder}
                />
            </div>
        </div>
    )
}