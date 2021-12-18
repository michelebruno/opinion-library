import * as React from "react";
import classNames from "classnames";
import {graphql, Link, useStaticQuery} from "gatsby";
import Image from "./Image";
import {ReactComponent as Logo} from '../images/logo.svg'

function MenuItem({children, to}) {
    return <li className={"first:border-current"}>
        <Link to={to} className={"hover:underline active:text-light-darker"}
              activeClassName={"border-light text-light underline "}>{children}</Link>
    </li>
}


const menu = [
    {
        path: '/',
        text: 'Context'
    },
    {
        path: '/library/',
        text: 'Library'
    },
    {
        path: '/about/',
        text: 'About'
    }
]

export default function Navbar({fixed, light, absolute, className, allBlack}) {
    return <nav
        className={classNames(fixed ? 'fixed' : [absolute ? 'absolute' : 'sticky'], "top-0 z-40 py-4 px-8 flex w-full uppercase justify-between text-base items-center", className)}>
        <Link to={"/"} className={"w-1/12"}>
            <Logo height={"60px"} className={"fill-current"}/>
        </Link>
        <ul className={"flex "}>
            {
                menu.map(({path, text}) => {
                    return <li key={path} className={"first:border-current ml-8"}>
                        <Link to={path} className={classNames(
                            "hover:underline",
                            !allBlack && "active:text-light-darker"
                        )}
                              activeClassName={classNames(
                                  "underline",
                                  !allBlack && [light ? "border-light-darker text-light-darker" : "border-light text-light"]
                              )}>{text}</Link>
                    </li>
                })
            }
        </ul>
    </nav>
}