import classNames from "classnames";
import React from "react";

export default function Index({words, chosen, setChosen}) {

    return <div className={classNames(
        "transition-all duration-1000 flex flex-col",
        chosen.current ? "w-2/12 border-r-2 border-t2 border-r-white" : "w-full "
    )}>
        <div
            className={"sticky top-0 text-light px-8 pt-4 pb-4 border-white border-b-2 transition-[width] duration-1000 bg-black select-none  whitespace-nowrap " + (!chosen.current && 'w-full cursor-pointer')}
            onClick={() => setChosen({})}
        >
            <h2
                className={
                    classNames("inline-block text-3xl uppercase ")
                }
            >
                Words
            </h2>
            <span
                className={classNames("ml-2 text-light text-2xl", chosen.current ? "hidden" : "")}>/ 20 most used in promask and nomask comments</span>

        </div>

        <ul className="overflow-y-scroll flex-1">
            {words
                .map(({name, finding}, index) => {
                    let isNextSelected = index+1 < words.length ? (words[index + 1].name === chosen.prev || words[index + 1].name === chosen.current) : false

                    return <li
                        key={name}
                        onMouseEnter={() => setChosen(
                            c => ({current: c.current, next: name})
                        )}
                        onMouseLeave={() => setChosen(c => ({...c, next: undefined}))}
                        onClick={() => chosen.current !== name ? setChosen({current: name}) : setChosen({})}
                        className={classNames(
                            "border-y-[1px] cursor-pointer hover:border-t-light",
                            "px-8 pt-4 pb-4",
                            !isNextSelected && "border-b-current",
                            chosen.current === name ? "bg-light text-black border-t-light" : "hover:text-light border-t-black",
                        )}
                    >
                        <h2 className={classNames(
                            "text-lg uppercase",
                        )}>
                            {name}
                        </h2>
                        {(chosen.current === name && finding) && <p className={"pt-1 text-base"}>
                            {finding}
                        </p>}
                    </li>
                })}
        </ul>
    </div>

}