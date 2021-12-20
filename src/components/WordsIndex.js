import classNames from "classnames";
import React from "react";

export default function Index({words, chosen, setChosen}) {

    return <div className={classNames(
        "duration-500 flex flex-col",
        chosen.current ? "w-2/12 border-r-2 border-t2 border-r-white" : "w-full "
    )}>
        <div
            className={"sticky top-0 text-light px-8 pt-4 pb-4 border-white border-b-2 duration-1000 bg-black select-none  whitespace-nowrap " + (!chosen.current && 'w-full cursor-pointer')}
            onClick={() => setChosen({})}
        >
            <h2
                className={
                    classNames("inline-block text-2xl uppercase ")
                }
            >
                Words
            </h2>
            <span
                className={classNames("ml-2 text-light text-2xl overflow-hidden", chosen.current ? "hidden" : "")}>
                    <span className="animate__animated animate__fadeInLeft">
                        / 20 most used in promask and nomask comments
                    </span>
                </span>

        </div>

        <ul className="overflow-y-scroll no-scrollbar flex-1">
            {words
                .map(({name, finding}, index) => {
                    let isNextSelected = index + 1 < words.length ? (words[index + 1].name === chosen.next || words[index + 1].name === chosen.current) : false

                    if (isNextSelected) {
                        console.log()
                    }
                    return <li
                        key={name}
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
                        {(chosen.current === name && finding) && <p className={"pt-1 text-base animate__fadeInUp animate__animated max-w-[15.6vw]"}>
                            {finding}
                        </p>}
                    </li>
                })}
        </ul>
    </div>

}