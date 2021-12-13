import React from "react";
import "../style.css"
import {Helmet} from "react-helmet";
import {Link} from "gatsby";
import classNames from "classnames";
import Button from "./Button";

function MenuItem({children, to}) {
    return <li className={"first:border-white"}>
        <Button as={Link} to={to}
                activeClassName={"border-light text-light"}>{children}</Button>
    </li>
}

export default function Layout({children, className, container, wrapperClassName, fixedHeader}) {
    return <div className={classNames(wrapperClassName)}>
        <Helmet bodyAttributes={{'class': 'bg-black text-white'}}/>
        <nav
            className={classNames(fixedHeader ? 'fixed' : 'sticky', "top-0 z-40 py-8 px-10 flex w-full uppercase justify-between text-lg")}>
            <Link to={"/"}>
                WW
            </Link>
            <ul className={"flex gap-8"}>
                <MenuItem to={"/"}>
                    Context
                </MenuItem>
                <MenuItem to={"/glossary"}>
                    Archive
                </MenuItem>
                <MenuItem to={"/about"}>
                    About
                </MenuItem>
            </ul>
        </nav>
        <div className={classNames('relative', container && 'mx-8', className)}>
            {children}
        </div>
    </div>
}