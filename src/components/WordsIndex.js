import classNames from "classnames";
import React from "react";

export default function Index({words, chosen, setChosen}) {


    return <div className={classNames(
        "transition-all duration-1000 overflow-y-scroll",
        chosen.current ? "w-2/12 border-r-2 border-r-current" : "w-full "
    )}>
        <h2 className={
            classNames("sticky top-0 text-3xl uppercase p-8 border-current border-y-2 transition-[width] duration-1000 bg-black", !chosen.current && 'w-screen')
        }>
            Words
        </h2>

        <ul className="pb-8">
            {words
                .map(({name, link}) => <li
                    key={name}
                    onMouseEnter={() => setChosen(
                        c => ({current: c.current, next: name})
                    )}
                    onMouseLeave={() => setChosen(c => ({...c, next: undefined}))}
                    onClick={() => chosen.current !== name ? setChosen({current: name}) : setChosen({})}
                    className={classNames("text-xl uppercase",
                        "px-8 py-8",
                        "border-b-[1px] border-current cursor-pointer",
                        "hover:bg-light hover:text-black",
                        chosen.current === name && "bg-light text-black"
                    )}
                >
                    {name}
                </li>)}
        </ul>
    </div>

}