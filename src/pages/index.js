import * as React from "react"
import {useEffect, useRef, useState} from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import classNames from "classnames";
import {graphql, Link} from "gatsby";
import Image from "../components/Image";
import Comment, {HighlightedWord} from "../components/Comment";
import DeltaWord from "../components/DeltaWord";
import Button from "../components/Button";
import HomeSlide from "../components/HomeSlide";
import SlotMaschine from "../components/SlotMaschine";
import Navbar from "../components/Navbar";
import {Helmet} from "react-helmet";
import * as Matter from "matter-js";
import "matter-dom-plugin";


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

gsap.defaults({
    duration: .8
})

const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

let wheelOpt = supportsPassive ? {passive: false} : false;
let wheelEvent = typeof document === 'undefined' || 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function goToSection(i) {
    gsap.to(window, {
        scrollTo: {y: i * window.innerHeight, autoKill: false},
        duration: .8,
        overwrite: true
    })
}

function disableScroll() {
    return;
    if (typeof window === 'undefined') return
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    // console.log("scroll disabled")
}

// call this to Enable
function enableScroll() {
    return;
    if (typeof window === 'undefined') return

    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);

    // console.log("scroll enabled")
}

const methods = {}

const commentsData = {
    812047727: 'vaccine',
    811710031: 'health',
    814486694: 'vaccine',
    822518213: 'health',
    817756846: 'vaccine',
    821382262: 'family'
}


function runMatterJs() {

    //se lo sbatti dentro con npm/yarn credo vada usato Matter = require('matter.js')
    //require dovrebbe essere roba di node.js, se non lo si usa js non capisce cosa volgia dire "matter" la mia curiosità non è giunta oltre
    Matter.use('matter-dom-plugin');

    /** Aliases **/
    var Engine = Matter.Engine;
    var Runner = Matter.Runner;
    var RenderDom = Matter.RenderDom;
    var DomBodies = Matter.DomBodies;
    var MouseConstraint = Matter.MouseConstraint;
    var DomMouseConstraint = Matter.DomMouseConstraint;
    var Mouse = Matter.Mouse;
    var World = Matter.World;

    /** Set up engine and renderer **/
    var engine = Engine.create();
    var world = engine.world;
    var runner = Runner.create();

    Runner.run(runner, engine);

    var render = RenderDom.create({
        engine: engine
    });

    RenderDom.run(render);

    /** Initialize physics bodies **/
    var block = DomBodies.block(100, 0, {
        Dom: {
            render: render,
            element: document.querySelector('#block')
        }
    });

    //tutta sta roba in realtà non serve ma stavo cercando di capire se potesse tornare utile
    var worldWidth = render.mapping.WORLD.width;
    var worldHeight = render.mapping.WORLD.height;
    var worldCenter = render.mapping.WORLD.center;
    var viewHeight = render.mapping.VIEW.height;
    var viewWidth = render.mapping.VIEW.width;
    var viewCenter = render.mapping.VIEW.center;

    var ground = Matter.DomBodies.block(viewCenter.x, viewHeight - 50, {
        Dom: {
            render: render,
            element: document.querySelector('#ground')
        },
        isStatic: true
    });

    World.add(world, [ground, block]);

    /** Mouse control **/
    var mouse = Mouse.create(document.body);
    var MouseConstraint = DomMouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false
            }
        }
    });

    World.add(world, MouseConstraint);

}


// markup
const IndexPage = ({data: {allFile, words, comments: {nodes: homeComments}, front}}) => {

    const [highlightWords, setHighlightWords] = useState(false)
    const changeDataSlide = useRef()
    const maskMandateSlide = useRef()
    const understandLanguage = useRef()
    const whyYouSigned = useRef()

    useEffect(() => {

        gsap.timeline({
            scrollTrigger: {
                trigger: changeDataSlide.current,
                start: 'top top',
                end: 'bottom bottom'
            },
            toggleActions: "play pause reverse reset",
        })
            .from(
                changeDataSlide.current.querySelector('h2'), {
                    opacity: 0,
                    duration: .7
                }
            )
            // .to({}, {duration: .3})
            .from('#change-data-bubbles > div', {
                y: 1200,
                stagger: .3,
                duration: 2,
                rotate: 15,
                ease: 'power4.out',
            })
            .addLabel('bubbles-up')
            .to('#change-data-bubbles > div', {
                rotate: 15,
                duration: 8,
                stagger: .4,
                repeat: -1,
                ease: 'linear',
                yoyo: true,
                yoyoEase: 'linear'
            }, 'bubbles-up')
            .to('#change-data-bubbles > div', {
                y: 20,
                duration: 6,
                stagger: .6,
                repeat: -1,
                ease: 'linear',
                yoyo: true,
                yoyoEase: 'linear'
            }, 'bubbles-up')


        let petitionImagesTl = gsap
            .from(gsap.utils.toArray(maskMandateSlide.current.querySelectorAll('img')), {
                paused: true,
                opacity: 0,
                y: 10,
                duration: .2,
                stagger: .1,
            })


        // MASK MANDATE
        gsap.timeline({
            scrollTrigger: {
                trigger: maskMandateSlide.current,
                // scrub: 0.3,
                start: 'top top',
                pin: maskMandateSlide.current.querySelector('.pin-me'),
                pinSpacer: maskMandateSlide.current.querySelector('.pin-spacer'),
                end: 'bottom bottom',
                onUpdate: scroll => {
                    scroll.direction === 1 && scroll.progress > .49 && petitionImagesTl.play()
                    scroll.direction === -1 && petitionImagesTl.reverse()
                }
            }
        })

        // WHY YOU SIGNED
        gsap.from('#fake-comment', {
            scrollTrigger: {
                trigger: '#fake-comment'
            },
            yPercent: 20,
            opacity: 0,
        })


        gsap.timeline({
            scrollTrigger: {
                trigger: '#some-words-frequent',
            }
        })
            .from('#some-words-frequent .delta-word', {
                y: -1200,
                stagger: -.2
            })
            .from('#view-library-button', {
                yPercent: 100,
                opacity: 0
            })

        // THIS LETS US UNDERSTAND
        gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current,
                    // scrub: true,
                    end: 'bottom bottom',
                    // toggleActions: "play pause reverse reset",

                },
            }
        )
            .addLabel('comment-apper')
            .from(
                gsap.utils.toArray(understandLanguage.current.querySelectorAll('.comment-container .comment')),
                {
                    yPercent: 20,
                    opacity: 0,
                    stagger: .3,
                }, 'comment-apper'
            )
            .from('#recurring-words', {
                y: 300,
                opacity: 0,
                delay: 1.6,
            }, 'comment-apper')
            .to({}, {
                delay: 2,
                onComplete() {
                    setHighlightWords(true)
                }
            }, 'comment-apper')


        let panels = gsap.utils.toArray(".snapper")

        function handleScroll(e) {
            e.preventDefault()

            const n = -e.wheelDeltaX || -e.deltaX, o = e.wheelDeltaY || -e.deltaY
                , r = Math.abs(n) > Math.abs(o) ? n : o;
            e && e.preventDefault()

            canAdvance && (r < 0 ? triggerNext() : triggerPrev())

        }

        window.addEventListener(wheelEvent, handleScroll, wheelOpt);


        let canAdvance = true,
            lastAdvance = 0;

        document.addEventListener("keyup", (function (e) {
            e.preventDefault()
            canAdvance && ("ArrowDown" === e.key || "ArrowRight" === e.key ? triggerNext() : "ArrowUp" !== e.key && "ArrowLeft" !== e.key || triggerPrev())
        }))


        // function swipeHandler(t) {
        //     t.deltaY < -30 ? triggerNext() : t.deltaY > 30 && triggerPrev()
        // }

        function goPrev() {
            if (lastAdvance === 0)
                return
            goToSection(--lastAdvance)
        }

        function goNext() {
            if (panels.length < lastAdvance)
                return
            goToSection(++lastAdvance)
        }

        function triggerNext() {
            if (canAdvance) {
                canAdvance = false
                goNext();
                setTimeout((function () {
                        canAdvance = true
                    }
                ), 1500)

            }
        }

        function triggerPrev() {
            if (canAdvance) {
                canAdvance = false
                goPrev()
                setTimeout((function () {
                        canAdvance = true
                    }
                ), 1500)

            }
        }


        // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
        gsap.timeline({
            scrollTrigger: {
                start: 0,
                end: "max",
                // snap: 1 / (panels.length - 1),
                scrub: true,
            }
        })
            .from('#progress-bar', {
                scaleY: 0
            })

        return () => window.removeEventListener(wheelEvent, handleScroll)
    }, [])

    return (
        <Layout fixedHeader className={"text-[4.34vw] leading-tight"}>
            <Helmet bodyAttributes={{'class': 'no-scrollbar bg-black text-white'}}/>
            <div className="fixed right-0 top-0 bottom-0 origin-top bg-light w-2 z-40" id="progress-bar"></div>
            <HomeSlide className={"bg-light text-black text-[6vw] grid-rows-6 z-50 select-none"}>

                <Navbar absolute light allBlack/>
                <Image image={front.nodes[2]} className={"absolute left-[8.3%] top-16 w-1/6"}/>
                <Image image={front.nodes[0]} className={"absolute right-16 top-32 w-1/6"}/>
                <Image image={front.nodes[3]} className={"absolute right-20 bottom-32 w-1/6"}/>
                <Image image={front.nodes[1]} className={"absolute left-20 bottom-60 w-1/6"}/>
                <div className="text-black text-center col-span-12 row-start-3 row-span-2 self-middle">
                    <h1 className={"text-9xl"}>Opinion Library</h1>
                    <h2 className={"text-[2.2rem] normal-case"}>What do change.org users think about mask mandates in
                        the
                        U.S.?</h2>
                </div>
                <div
                    className="absolute left-0 right-0 bottom-0 py-8 text-center text-xl normal-case text-black">
                    <p onClick={() => goToSection(1)} className={"cursor-pointer"}>
                        Scroll down to discover more

                        <span className="mx-auto w-12 pt-4 block">
                            <svg viewBox="0 0 63 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M61.5 2L32 23.5L1 2" stroke="black" strokeWidth="3"/>
                            </svg>
                        </span>
                    </p>


                </div>
            </HomeSlide>
            <HomeSlide span={1} ref={changeDataSlide}>
                <h2 className={"col-span-9"}>
                    <mark>Change.org</mark>
                    {" "}
                    is the largest petition website, and in 2020 <span
                    className="inline-block">it only grew</span> larger,
                    especially in the United States
                </h2>
                <div id={'change-data-bubbles'}
                     className="text-black text-center normal-case absolute h-full w-full inset-0">
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[-30deg] ",
                                "bg-light rounded-full ",
                                "flex items-center justify-center ",
                                "w-[60vmin] h-[60vmin] ",
                                "absolute right-0  bottom-[15%] "
                            )}>
                        <div>
                            <p className={"text-3xl"}>+208,5%</p>
                            <p className="text-base">Signatures</p>
                        </div>
                    </div>
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[18deg] ",
                                "bg-light rounded-full px-2 ",
                                "flex items-center justify-center ",
                                "w-[16vmin] h-[16vmin] ",
                                "absolute right-[66%]  bottom-[16%]"
                            )}>
                        <div>
                            <p className={"text-3xl"}>+33%</p>
                            <p className="text-base">Global Users</p>
                        </div>
                    </div>
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[-30deg] ",
                                "bg-light rounded-full px-2 ",
                                "flex items-center justify-center ",
                                "w-[15vmin] h-[15vmin] ",
                                "absolute left-[41%] bottom-[4%]"
                            )}>
                        <div>
                            <p className={"text-3xl"}>+46%</p>
                            <p className="text-base">Published Petitions</p>
                        </div>
                    </div>

                </div>

            </HomeSlide>
            <HomeSlide span={2} ref={maskMandateSlide}>
                <div className="col-span-12 pin-spacer ">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">
                        <h2 className={"col-span-8"} style={{letterSpacing: -1}}>
                            As the platform grew,
                            so did the topics being discussed. One of the
                            most <mark>controversial
                            themes</mark> has been
                            <br/>
                            <SlotMaschine words={words}/>
                        </h2>

                    </div>

                </div>
                <div className={"absolute h-screen w-full bottom-0 left-0 right-0 p-8"}>
                    <div className="relative h-full w-full z-40 home-petition-images ">
                        <Image image={allFile.nodes[7]} className={"w-1/3 absolute -top-16 right-8"}/>
                        <Image image={allFile.nodes[0]} className={"w-1/3 absolute top-0 left-0"}/>
                        <Image image={allFile.nodes[8]} className={"w-1/3 absolute top-[16%] left-[41%]"}/>
                        <Image image={allFile.nodes[2]} className={"w-1/3 absolute top-1/3 mt-8 -right-16"}/>
                        <Image image={allFile.nodes[1]}
                               className={"w-1/3 absolute top-1/2 -translate-y-1/2 left-[8.3%]"}/>
                        <Image image={allFile.nodes[3]} className={"w-1/3 absolute bottom-[16%] right-[16%]"}/>
                        <Image image={allFile.nodes[4]} className={"w-1/3 absolute bottom-4 left-[16%]"}/>
                        <Image image={allFile.nodes[5]} className={"w-1/3 absolute top-[90%] -left-1/4 "}/>
                        <Image image={allFile.nodes[6]} className={"w-1/3 absolute top-[90%] right-0"}/>

                    </div>
                </div>
            </HomeSlide>
            <HomeSlide className={"auto-rows-min content-center pb-32 "} id={"why-you-signed"}
                       ref={whyYouSigned}>
                <div className="col-span-9">
                    <p className="pb-8 ">
                        <mark>Why</mark>
                        {" "}
                        they have signed
                    </p>
                    <Comment id={'fake-comment'} user="30200130" created_at={"1 minute ago"}
                             petition={{title: "Petition title"}}
                             createdAt={"1 minute ago"}
                             large origin={'black'}>
                        Those who signed these petitions explained their reasons in comments
                    </Comment>
                </div>
            </HomeSlide>
            <HomeSlide span={2} className={"auto-rows-min"} id={"understand-language"} ref={understandLanguage}>
                <div className="col-span-12 pin-spacer ">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">
                        <div className={"col-span-8 relative "}>
                            <p id={'this-allows'}>
                                This allows us to understand the different points of view and
                                the <mark>language</mark> used to
                                express them
                            </p>
                            <p id={'recurring-words'} className={'absolute'}>
                                We can find recurring
                                <HighlightedWord isActive={highlightWords}
                                                 className={highlightWords && 'text-black'}>words</HighlightedWord> in
                                these comments
                            </p>

                        </div>
                        <div className="col-span-4  normal-case overflow-hidden">
                            <div
                                className="grid auto-rows-min gap-y-4 comment-container h-screen overflow-y-scroll no-scrollbar ">
                                {
                                    Object.entries(commentsData).map(([id, word]) => {


                                        const comment = homeComments.find(({commentId}) => commentId == id)

                                        return <Comment key={id}
                                                        highlightWords={highlightWords}
                                                        word={word}
                                                        {...comment}
                                                        origin={'black'}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </HomeSlide>
            <HomeSlide span={1} className={"pb-32"} id={"some-words-frequent"}>

                <div className={"col-span-6"}>
                    <h2 className={"mb-4"}>
                        these words are common, but are used in different ways by <span
                        className="bg-promask inline-block">pro mask</span> or
                        {' '}
                        <span className="bg-nomask inline-block">no mask</span> users
                    </h2>
                </div>
                <div className="col-span-6 relative">
                    <DeltaWord promask={55} bottom={78} left={45} rotate={9}>Health</DeltaWord>
                    <DeltaWord promask={45} bottom={65} right={12} rotate={6}>Vaccine</DeltaWord>
                    <DeltaWord promask={60} bottom={53} right={8} rotate={12}>Student</DeltaWord>
                    <DeltaWord promask={55} bottom={40} right={20} rotate={2}>School</DeltaWord>
                    <DeltaWord promask={51} bottom={25} right={10} rotate={11}>Science</DeltaWord>
                    <DeltaWord promask={61} bottom={19} left={14} rotate={-39}>Family</DeltaWord>
                    <DeltaWord promask={33} bottom={12} right={12} rotate={3}>Mandate</DeltaWord>
                    <DeltaWord promask={54} bottom={0} rotate={-4}>Teacher</DeltaWord>
                    <DeltaWord promask={32} bottom={0} right={0} rotate={4}>Children</DeltaWord>
                </div>
            </HomeSlide>
            <HomeSlide>
                <div className="col-span-9" style={{letterSpacing: -1}}>This is an opinion library
                    collecting comments and showing relations among the most used words in pro mask and no mask
                    comments
                </div>
                <div className="absolute left-0 right-0 bottom-8 text-center">
                    <div className="mx-auto inline-block">
                        <Button id="view-library-button" as={Link} to={"/library/"} large>View the library</Button>
                    </div>
                </div>
            </HomeSlide>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`{
    words: allSheetsScatter(limit: 64, skip: 2){
        nodes {
            name
        }
    }
    allFile(filter: {relativeDirectory: {eq: "home"}}) {
        nodes {
            id
            childImageSharp {
                gatsbyImageData
            }
        }
    }

    comments: allCommentsJson(filter: {showInHome: {eq: true}}) {
        nodes {
            ...CommentJsonFragment
        }
    }
    front: allFile(filter: {relativeDirectory: {eq: "landing"}}) {
        nodes {
            childImageSharp {
                gatsbyImageData
            }
        }
    }
}`
