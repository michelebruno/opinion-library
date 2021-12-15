import React from "react";
import classNames from "classnames";

export function ArchiveButton({children, className, isSelected, isCurrent, ...props}) {

    return <button
        disabled={isCurrent}
        className={
            classNames(
                "archive-button",
                !isCurrent && !isSelected &&
                'text-white hover:border-light',
                isSelected && "bg-light text-black border-light",
                className
            )}
        {...props}
    >
        {children}
    </button>
}


export default function Button({children, id, as: As, after, large, ...props}) {
    return <As id={id}
               className={"group hover:text-light inline-block flex items-middle"}
               activeClassName={"border-light text-light"} {...props}>
        <span
            className={
                (large ? 'py-4 px-8 text-2xl rounded-3xl' : ' text-lg py-1 px-4 rounded-2xl') +
                " border-current group-active:bg-light group-active:text-black  border-[1px]"
            }>
                    {children}
        </span>
        {after}
    </As>

}

Button.defaultProps = {
    as: 'a'
}