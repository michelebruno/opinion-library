import React from "react";
import classNames from "classnames";

export function ArchiveButton({children, className, isSelected, isCurrent, checkbox, ...props}) {

    return <button
        disabled={isCurrent}
        className={
            classNames(
                "archive-button border-2 select-none",

                checkbox ?
                    [
                        'checkbox ',
                        !isCurrent && 'hover:border-light active:bg-light active:text-black',
                        isCurrent && 'bg-gray border-white cursor-disabled opacity-30',
                        isSelected && 'border-light'
                    ] :
                    [
                        "text-sm 2xl:text-base",
                        (!isCurrent && !isSelected) &&
                        'text-white border-black hover:border-light',
                        isSelected && "bg-light text-black border-light",
                        isCurrent && 'bg-gray text-white'
                    ],
                className
            )}
        {...props}
    >
        {checkbox && isSelected && <span className={"leading-[0] text-lg mr-1"}>{'\u00D7'}</span>}
        <span>
                    {children}

        </span>
    </button>
}


export default function Button({children, id, as: As, after, large, light, ...props}) {
    return <As id={id}
               className={classNames("group inline-block flex items-middle", light ? 'hover:text-light-darker' : 'hover:text-light')}
               activeClassName={classNames(light ? "border-light-darker text-light-darker" : "border-light text-light")} {...props}>
        <span
            className={classNames(

                (large ? 'py-4 px-8 text-2xl rounded-3xl' : ' text-lg py-1 px-4 rounded-2xl'),
                " border-current group-active:bg-light group-active:text-black border"
            )
            }>
                    {children}
        </span>
        {after}
    </As>

}

Button.defaultProps = {
    as: 'a'
}