import React from "react";
import "../style.css"
import {Helmet} from "react-helmet";
import {Link} from "gatsby";
import classNames from "classnames";

export default function Layout({children, className, container, wrapperClassName}) {
    return <div className={classNames(wrapperClassName)}>
        <Helmet>
            <body style={{'overscroll-behavior-y': 'none'}} className="bg-black text-white rel"></body>
        </Helmet>
        <nav className={"sticky top-0 py-8 px-8 flex w-full uppercase justify-between text-2xl"}>
            <Link to={"/"}>
                WW
            </Link>
            <ul className={"flex gap-8"}>
                <li><Link activeClassName={"pb-1 border-b-2 border-b-white"} to={"/glossary"}>Glossary</Link></li>
                <li><Link activeClassName={"pb-1 border-b-2"} to={"/glossary"}>About</Link></li>
            </ul>
        </nav>
        <div className={classNames('relative', container && 'mx-8', className)}>
            {children}
        </div>
    </div>
}