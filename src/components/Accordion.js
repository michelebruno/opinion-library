import React from "react";
import classNames from "classnames";

export default function Accordion({onClick, isOpen, children, title}) {


    return <div className={"flex-grow flex flex-col " + (isOpen && "h-full")}>
        <h2 className={"p-8 text-3xl uppercase border-y-2 border-y-current box-border " + (title === 'Comments' && '-mx-[2px]')}
            onClick={onClick}
        >{title}</h2>
        <div className={classNames(
            "overflow-hidden",
            "transition-all duration-1000 ",
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