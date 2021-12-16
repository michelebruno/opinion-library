import classNames from "classnames";
import React from "react";

export default function Index({words, chosen, setChosen}) {

    return <div className={classNames(
        "transition-all duration-1000 overflow-y-scroll",
        chosen.current ? "w-2/12 border-r-2 border-r-current" : "w-full "
    )}>
        <h2 className={
            classNames("sticky top-0 text-3xl px-8 pt-4 pb-3 border-current border-y-2 transition-[width] duration-1000 bg-black select-none", !chosen.current && 'w-screen')
        }>
            Words
            <span
                className={classNames("ml-4 text-gray", chosen.current ? "hidden" : "")}>20 most used in promask and nomask comments</span>

        </h2>

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
                        "px-8 pt-4 pb-3",
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