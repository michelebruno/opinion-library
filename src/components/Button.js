import React from "react";


export default function Button({children, id, as: As, after, large, ...props}) {
    return <As id={id}
               className={"group hover:text-light inline-block flex items-middle "}
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