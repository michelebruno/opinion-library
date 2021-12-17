import classNames from "classnames";
import React from "react";

export default function Index({words, chosen, setChosen}) {

    return <div className={classNames(
        "transition-all duration-1000 overflow-y-scroll",
        chosen.current ? "w-2/12 border-r-2 border-r-current" : "w-full "
    )}>
        <div
            className={"sticky top-0 text-light px-8 pt-4 pb-4 border-white border-b-2 transition-[width] duration-1000 bg-black select-none  whitespace-nowrap " + (!chosen.current && 'w-screen cursor-pointer')}
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

        <ul className="pb-8">
            {words
                .map(({name, finding}) => <li
                    key={name}
                    onMouseEnter={() => setChosen(
                        c => ({current: c.current, next: name})
                    )}
                    onMouseLeave={() => setChosen(c => ({...c, next: undefined}))}
                    onClick={() => chosen.current !== name ? setChosen({current: name}) : setChosen({})}
                    className={classNames(
                        "border-y-[1px] border-b-current cursor-pointer hover:border-t-light",
                        chosen.current === name ? "bg-light text-black border-t-light" : "hover:text-light border-t-black",
                    )}
                >
                    <h2 className={classNames(
                        "text-xl uppercase",
                        "px-8 pt-4 pb-4",
                    )}>
                        {name}
                    </h2>
                    {(chosen.current === name && finding) && <p className={"px-8 pb-4"}>
                        {finding}
                    </p>}
                </li>)}
        </ul>
    </div>

}