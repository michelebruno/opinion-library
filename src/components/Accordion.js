import React from "react";
import classNames from "classnames";

export default function Accordion({onClick, isOpen, children, title, subtitle}) {


    return <div className={"flex-grow flex flex-col " + (isOpen && "h-full")}>
        <div className={"pt-4 pb-3 px-8 border-t-2 border-y-current box-border flex justify-between group select-none cursor-pointer"} onClick={onClick}
        >
            <h2
                className={" text-3xl "}
            >
                {title}
                <span className={classNames("ml-4 text-gray transition-[opacity]", !isOpen? "opacity-0 group-hover:opacity-50" : "opacity-50")}>{subtitle}</span>
            </h2>

            <div className={"pt-1"}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.5L25 12.5" stroke="white" strokeWidth="2"/>
                    <path d="M12.5 25L12.5 -1.04308e-06" stroke="white" strokeWidth="2"
                          className={"transition-all " + (isOpen && "rotate-90")}/>
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