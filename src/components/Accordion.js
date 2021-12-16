import React from "react";
import classNames from "classnames";

export default function Accordion({onClick, isOpen, children, title, subtitle}) {


    return <div className={"flex-grow flex flex-col " + (isOpen ? "h-full": 'first:border-b-2 last:border-t-2')}>
        <div
            className={"pt-4 pb-4 px-8 border-y-white box-border flex justify-between group select-none cursor-pointer text-light " }
            onClick={onClick}
        >
            <div className={"whitespace-nowrap "}>
                <h2
                    className={" text-3xl uppercase inline-block"}
                >
                    {title}
                </h2>
                <span
                    className={classNames("ml-2 leading-none text-2xl transition-[opacity] normal-case", isOpen ? "" : "hidden group-hover:inline-block group-hover:opacity-50 group-active:opacity-100")}>
                    / {subtitle}
                </span>

            </div>

            <div>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 12.5L25 12.5" stroke="currentColor" strokeWidth="2"/>
                    {isOpen && <path d="M12.5 25L12.5 -1.04308e-06" stroke="currentColor" strokeWidth="2"/>}
                </svg>
            </div>

        </div>

        <div className={classNames(
            "overflow-hidden",
            "",
            isOpen ? "h-full" : 'h-0'
        )}>
            {children}

        </div>
    </div>
}


Accordion.defaultProps = {
    onToggle: () => {
    }
}