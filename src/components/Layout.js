import React from "react";
import "../style.css"
import {Helmet} from "react-helmet";
import {graphql, Link, useStaticQuery} from "gatsby";
import classNames from "classnames";
import Button from "./Button";
import Image from "./Image";
import Footer from "./Footer";

function MenuItem({children, to}) {
    return <li className={"first:border-current"}>
        <Link to={to} className={"hover:underline active:text-light-darker"}
                activeClassName={"border-light text-light underline "}>{children}</Link>
    </li>
}

export default function Layout({children, className, container, wrapperClassName, fixedHeader, footer}) {

    const {logo} = useStaticQuery(graphql`{
        logo : file(relativePath: {eq: "logo.png"}) {
            childImageSharp {
                gatsbyImageData
            }
        }
    }`)
    return <div className={classNames(wrapperClassName)}>
        <Helmet bodyAttributes={{'class': 'bg-black text-white'}}/>
        <nav
            className={classNames(fixedHeader ? 'fixed' : 'sticky', "top-0 z-40 py-4 px-8 flex w-full uppercase justify-between text-lg items-center")}>
            <Link to={"/"} className={"w-1/12"}>
                <Image image={logo} />
            </Link>
            <ul className={"flex gap-8"}>
                <MenuItem to={"/"}>
                    Context
                </MenuItem>
                <MenuItem to={"/library/"}>
                    Library
                </MenuItem>
                <MenuItem to={"/about/"}>
                    About
                </MenuItem>
            </ul>
        </nav>
        <div className={classNames('relative', container && 'mx-8', className)}>
            {children}
        </div>
        {footer && <Footer />}
    </div>
}