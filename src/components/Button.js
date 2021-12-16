import React from "react";
import classNames from "classnames";

export function ArchiveButton({children, className, isSelected, isCurrent, checkbox, ...props}) {

    return <button
        disabled={isCurrent}
        className={
            classNames(
                "archive-button",
                checkbox ?
                    [
                        'checkbox border-2',
                        !isCurrent && 'hover:border-light active:bg-light active:text-black',
                        isCurrent && 'bg-gray border-gray cursor-disabled',
                        isSelected && 'border-light before:content-["X"] before:text-xs before:mr-2'
                    ] :
                    [
                        (!isCurrent && !isSelected) &&
                        'text-white hover:border-light',
                        isSelected && "bg-light text-black border-light",
                        isCurrent && 'bg-gray text-white'
                    ],
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
                " border-current group-active:bg-light group-active:text-black  border"
            }>
                    {children}
        </span>
        {after}
    </As>

}

Button.defaultProps = {
    as: 'a'
}