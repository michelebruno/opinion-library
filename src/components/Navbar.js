import * as React from "react";
import classNames from "classnames";
import {graphql, Link, useStaticQuery} from "gatsby";
import Image from "./Image";


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

export default function Navbar({fixed, light}) {

    const {logo} = useStaticQuery(graphql`{
        logo : file(relativePath: {eq: "logo.png"}) {
            childImageSharp {
                gatsbyImageData
            }
        }
    }`)


    return <nav
        className={classNames(fixed ? 'fixed' : 'sticky', "top-0 z-40 py-4 px-8 flex w-full uppercase justify-between text-lg items-center")}>
        <Link to={"/"} className={"w-1/12"}>
            <Image image={logo}/>
        </Link>
        <ul className={"flex gap-8"}>
            {
                menu.map(({path, text}) => {
                    return <li className={"first:border-current"}>
                        <Link to={path} className={classNames(
                            "hover:underline",
                            "active:text-light-darker"
                        )}
                              activeClassName={classNames(
                                  "underline",
                                  light ? "border-light-darker text-light-darker" : "border-light text-light",
                              )}>{text}</Link>
                    </li>
                })
            }
        </ul>
    </nav>
}