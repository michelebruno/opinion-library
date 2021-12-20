import * as React from "react";
import classNames from "classnames";
import {Link} from "gatsby";
import Logo from '../images/logo.component.svg'
import Button from "./Button";
import {useState} from "react";

import video1 from '../video/tutorial_1 MENO.mp4'
import video2 from '../video/tutorial_2 MENO.mp4'
import video3 from '../video/tutorial_3 MENO.mp4'
import video4 from '../video/tutorial_4 MENO.mp4'
import video5 from '../video/tutorial_5 MENO.mp4'


const tutorialSlides = [
    {
        video: video1,
        text: "When first opening the archive you’ll be presented a list of the twenty most used words in both promask and nomask comments. Select a word to discover which other words are most commonly used together with it."
    },

    {
        video: video2,
        text: "Once a word is selected, a central panel will appear to display how the other words are used by the two groups in comments mentioning it. In the example above we see which groups use wich words in comments mentioning to “body”."
    },

    {
        video: video3,
        text: "Related words will be positioned horizontally according to their usage by the two groups. Words most frequently used by promasks will be found on the right, while nomask words will be positioned to the left. The vertical disposition follows alphabetic order."
    },
    {
        video: video4,
        text: "You can read the comments mentioning the selected word by clicking on the Comments tab.\n" +
            "An additional filter can be added by selecting one of the words from the list inside the Comments tab. This will add a filter and display only comments using both words."
    },
    {
        video: video5,
        text: "You can read the comments mentioning the selected word by clicking on the Comments tab. An additional filter can be added by selecting one of the words from the list inside the Comments tab. This will add a filter and display only comments using both words."
    },

]

function Tutoria({tutorial, onChangeTutorial}) {


    return <div className={"fixed inset-0 z-50"}>
        <div className="w-full h-full relative">
            <div className="bg-gray absolute inset-0 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="mx-16 bg-[#ECECEC] w-full md:w-8/12 2xl:w-6/12 rounded-3xl text-black relative">
                    <div className="absolute top-0 right-0">
                        <button className="px-8 py-6 cursor-pointer inline-block "
                                onClick={() => onChangeTutorial(false)}>

                            <svg width="1rem" height="1rem" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className={"stroke-black inline-block"}>
                                <path d="M1 0.999999L13 13" strokeWidth="2"/>
                                <path d="M13 1L0.999999 13" strokeWidth="2"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center h-full ">
                        <div className="">
                            <button
                                className={"cursor-pointer pl-8 pr-4 py-6  text-xl " + (tutorial === 0 && 'invisible')}
                                onClick={() => onChangeTutorial(i => i <= 0 ? false : i - 1)}>
                                {"<-"}
                            </button>
                        </div>
                        <div className={"overflow-hidden pt-20 pb-16"}>
                            <div className="w-full flex flex-nowrap transition-all duration-500"
                                 style={{transform: "translateX(" + tutorial * -100 + "%)"}}>
                                {tutorialSlides.map(t => <div className={"w-full flex-shrink-0 px-4 box-border"}
                                                              key={t.video}>
                                    <video src={t.video}
                                           className={"aspect-[16/10]"}
                                           muted
                                           playsInline
                                           autoPlay
                                           loop></video>
                                    <p className="pt-6 text-lg">
                                        {t.text}
                                    </p></div>)}
                            </div>
                        </div>
                        <div className="">
                            <button
                                className={"cursor-pointer pl-8 pr-4 py-6 rotate-180 block text-xl " + (tutorial === 4 && 'invisible')}
                                onClick={() => onChangeTutorial(i => i >= (tutorialSlides.length - 1) ? false : i + 1)}>
                                {"<-"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

}

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

export default function Navbar({fixed, light, absolute, className, allBlack, tutorial}) {
    const [showTutorial, setTutorial] = useState(false)

    return <>
        <nav
            className={classNames(
                fixed ? 'fixed' : [absolute ? 'absolute' : 'sticky'],
                "top-0 z-40 py-4 px-8 flex w-full uppercase justify-between text-base items-center",
                light && 'navbar-light',
                className
            )}>
            <Link to={"/"} className={"w-1/12"}>
                <Logo height={"60px"} className={"fill-current"}/>
            </Link>
            <ul className={"flex items-center "}>
                <Button as="button" className={tutorial ? 'uppercase' : 'invisible'}
                        onClick={() => setTutorial(0)}>Tutorial</Button>
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
        {typeof showTutorial === "number" && <Tutoria tutorial={showTutorial} onChangeTutorial={setTutorial}/>}
    </>
}