import React, {useState} from "react";
import "../style.css"
import {Helmet} from "react-helmet";
import classNames from "classnames";
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Layout({children, className, container, wrapperClassName, fixedHeader, footer, light, tutorial}) {

    return <div className={classNames("antialiased",wrapperClassName)}>
        <Helmet bodyAttributes={{'class': 'bg-black text-white'}}/>
        <Navbar fixed={fixedHeader} light={light} tutorial={tutorial}/>
        <div className={classNames('relative ', container && 'mx-8', className)}>
            {children}
        </div>
        {footer && <Footer />}
    </div>
}