import * as React from "react"
import {useEffect, useRef, useState} from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {TextPlugin} from "gsap/TextPlugin"
import classNames from "classnames";
import {graphql, Link} from "gatsby";
import Image from "../components/Image";
import Comment, {HighlightedWord} from "../components/Comment";
import Button from "../components/Button";
import HomeSlide from "../components/HomeSlide";
import SlotMaschine from "../components/SlotMaschine";
import Navbar from "../components/Navbar";
import {Helmet} from "react-helmet";
import {ReactComponent as Rettangoli} from '../images/retatngoli.svg'
import useMatter from "../components/useMatter";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

gsap.defaults({
    duration: .8,
    ease: 'power4.out'
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
        overwrite: true,
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
    821382262: 'family',
    814480242: 'vaccine'
}

const links = {
    'broken.png': 'https://www.change.org/p/broken-arrow-city-council-broken-arrow-mask-mandate-rejection',
    'elkhorn.png': 'https://www.change.org/p/superintendent-of-elkhorn-public-school-elkhorn-public-school-ne-mask-mandate-for-under-12-years-old',
    'masks-optional.png': 'https://www.change.org/p/parents-masks-optional-for-hall-county-schools',
    'make-masks-mandatory.png': 'https://www.change.org/p/allen-isd-school-board-make-masks-mandatory-in-allen-isd-schools',
    'unmask.png': 'https://www.change.org/p/roy-cooper-unmask-our-children-at-school',
    'mask-choice.png': 'https://www.change.org/p/center-grove-school-board-mask-choice-center-grove-2021-22',
    'make-face-mask.png': 'https://www.change.org/p/duluth-mayor-emily-larson-make-masks-mandatory-in-public-in-duluth-mn-during-the-covid-19-pandemic',
    'keep-texas.png': 'https://www.change.org/p/texas-a-m-university-office-of-the-provost-keep-texas-a-m-s-current-face-covering-policy-in-place-after-march-10',
    'demand.png': 'https://www.change.org/p/parents-of-leander-isd-demand-an-emergency-mask-mandate-meeting-from-leander-independent-school-district-board',
    'kenston.png': 'https://www.change.org/p/the-kenston-local-school-board-kenston-local-schools-petition-to-make-masks-optional',
}


// markup
const IndexPage = ({data: {allFile, words, comments: {nodes: homeComments}}}) => {

    const [highlightWords, setHighlightWords] = useState(false)
    const landing = useRef()
    const changeDataSlide = useRef()
    const maskMandateSlide = useRef()
    const understandLanguage = useRef()
    const whyYouSigned = useRef()

    useMatter(landing)

    function openPetitionLink(index) {
        let fn = allFile.nodes[index].relativePath.slice(5)

        return () => window.open(links[fn], '_blank')

    }

    useEffect(() => {


        gsap.timeline({
            scrollTrigger: {
                trigger: changeDataSlide.current,
                start: 'top top',
                end: 'bottom bottom'
            },
            toggleActions: "play pause reverse reset",
        })
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
                start: 'top top',
                end: 'bottom bottom',
                pin: maskMandateSlide.current.querySelector('.pin-me'),
                pinSpacer: maskMandateSlide.current.querySelector('.pin-spacer'),
                anticipatePin: 1,
                onUpdate: scroll => {
                    scroll.direction === 1 && scroll.progress > .49 && petitionImagesTl.play()
                    scroll.direction === -1 && petitionImagesTl.reverse()
                }
            }
        })




        // WHY YOU SIGNED
        gsap.from('#fake-comment ', {
            scrollTrigger: {
                trigger: '#fake-comment'
            },
            yPercent: 20,
            opacity: 0,
        })

        // WHY YOU SIGNED
        gsap.to('#fake-comment .comment-text', {
            text: {
                value: 'Those who signed these petitions explained their reasons in comments.'
            },
            scrollTrigger: {
                trigger: '#fake-comment',
            },
            duration: 2,
            delay: .8
        })


        gsap.timeline({
            scrollTrigger: {
                trigger: '#some-words-frequent',
                toggleActions: "play pause pause reverse",
            }
        })
            .from('#some-words-frequent svg > g', {
                y: -1200,
                stagger: .2
            })

        // THIS LETS US UNDERSTAND
        gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current,
                    end: 'bottom bottom',
                    pin: understandLanguage.current.querySelector('.pin-me'),
                    pinSpacer: understandLanguage.current.querySelector('.pin-spacer'),
                    // toggleActions: "play pause reverse reset",
                },
            }
        )


        gsap.to('#recurring-words', {
            scrollTrigger: {
                trigger: '#recurring-words',
                onLeaveBack() {
                    setHighlightWords(false)
                },
                onEnterBack() {
                    setHighlightWords(true)
                },
                onEnter() {
                    setHighlightWords(true)
                }
            },
        })

        gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current,
                    end: 'bottom bottom',
                    // toggleActions: "play pause reverse reset",
                },
            }
        )
            .from(
                gsap.utils.toArray(understandLanguage.current.querySelectorAll('.comment-container .comment')),
                {
                    yPercent: 20,
                    opacity: 0,
                    stagger: .3,
                },
            )


        let panels = gsap.utils.toArray(".snapper")

        function handleScroll(e) {
            e.preventDefault()

            const n = -e.wheelDeltaX || -e.deltaX, o = e.wheelDeltaY || -e.deltaY
                , r = Math.abs(n) > Math.abs(o) ? n : o;
            e && e.preventDefault()

            canAdvance && (r < 0 ? triggerNext() : triggerPrev())

        }

        function handleKeyUp(e) {

            e.preventDefault()
            canAdvance && ("ArrowDown" === e.key || "ArrowRight" === e.key ? goNext() : "ArrowUp" !== e.key && "ArrowLeft" !== e.key || goPrev())
        }

        window.addEventListener(wheelEvent, handleScroll, wheelOpt);

        document.addEventListener("keyup", handleKeyUp)
        let canAdvance = true,
            lastAdvance = 0;


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


        // just in case the user forces the scroll to an in between spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
        gsap.timeline({
            scrollTrigger: {
                start: 0,
                end: "max",
                // snap: 1 / (panels.length - 1),
                scrub: true,
            }
        })
            .from('#progress-bar', {
                scaleY: 0,
                ease: 'linear'

            })

        return () => {
            window.removeEventListener(wheelEvent, handleScroll)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <Layout fixedHeader className={"text-[4.34vw] leading-tight"}>
            <Helmet bodyAttributes={{'class': 'no-scrollbar bg-black text-white'}}/>
            <div className="fixed right-0 top-0 bottom-0 origin-top bg-light w-2 z-40" id="progress-bar"></div>
            <HomeSlide className={"text-black text-[6vw] grid-rows-6 z-50 select-none relative z-1"} ref={landing}>

                <Navbar absolute light allBlack/>
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
                                "bg-light rounded-full px-4 ",
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
                                "bg-light rounded-full px-4 ",
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
                        <Image image={allFile.nodes[7]} className={"w-1/3 absolute -top-16 right-8"}
                               onClick={openPetitionLink(7)}/>
                        <Image image={allFile.nodes[0]} className={"w-1/3 absolute top-0 left-0"}
                               onClick={openPetitionLink(0)}/>
                        <Image image={allFile.nodes[8]} className={"w-1/3 absolute top-[16%] left-[41%]"}
                               onClick={openPetitionLink(8)}/>
                        <Image image={allFile.nodes[2]} className={"w-1/3 absolute top-1/3 mt-8 -right-16"}
                               onClick={openPetitionLink(2)}/>
                        <Image image={allFile.nodes[1]}
                               className={"w-1/3 absolute top-1/2 -translate-y-1/2 left-[8.3%]"}
                               onClick={openPetitionLink(1)}/>
                        <Image image={allFile.nodes[3]} className={"w-1/3 absolute bottom-[16%] right-[16%]"}
                               onClick={openPetitionLink(3)}/>
                        <Image image={allFile.nodes[4]} className={"w-1/3 absolute bottom-32 left-[16%]"}
                               onClick={openPetitionLink(4)}/>
                        <Image image={allFile.nodes[5]} className={"w-1/3 absolute top-[83%] -left-[10%] "}
                               onClick={openPetitionLink(5)}/>
                        <Image image={allFile.nodes[6]} className={"w-1/3 absolute top-[85%] right-0"}
                               onClick={openPetitionLink(6)}/>

                    </div>
                </div>
            </HomeSlide>
            <HomeSlide className={"auto-rows-min content-center pb-32 "} id={"why-you-signed"}
                       ref={whyYouSigned}>
                <div className="col-span-9 min-h-[30rem]">
                    <p className="pb-8 ">
                        <mark>Why</mark>
                        {" "}
                        they have signed
                    </p>
                    <Comment id={'fake-comment'} user="30200130" created_at={"1 minute ago"}
                             petition={{title: "Petition title"}}
                             createdAt={"1 minute ago"}
                             large origin={'black'} />
                </div>
            </HomeSlide>
            <HomeSlide span={2} className={"auto-rows-min"} id={"understand-language"} ref={understandLanguage}>
                <div className="col-span-12 -mt-32 pt-32">
                    <div className=" w-full h-full grid grid-cols-12 gap-16 relative">
                        <div className={"col-span-8 "}>
                        </div>
                        <div className="col-span-4  normal-case overflow-hidden pin-spacer">
                            <div
                                className="pin-me grid auto-rows-min gap-y-4 comment-container h-screen overflow-y-scroll no-scrollbar ">
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
                <div className="absolute inset-0 px-8 grid grid-cols-12 gap-16">
                    <div className="col-span-8">
                        <div className="h-screen w-full pt-32">
                            <p id={'this-allows'}>
                                This allows us to understand the different points of view and
                                the <mark>language</mark> used to
                                express them
                            </p>

                        </div>
                        <div className="h-screen w-full pt-32">
                            <p id={'recurring-words'}>
                                We can find recurring
                                <HighlightedWord isActive={highlightWords}
                                                 className={highlightWords && 'text-black'}>words</HighlightedWord> in
                                these comments
                            </p>

                        </div>
                    </div>
                </div>
            </HomeSlide>
            <HomeSlide span={1} className={""} id={"some-words-frequent"}>

                <div className={"col-span-6"}>
                    <h2 className={"mb-4"}>
                        these words are common, but are used in different ways by <span
                        className="bg-promask inline-block">pro mask</span> or
                        {' '}
                        <span className="bg-nomask inline-block">no mask</span> users
                    </h2>
                </div>
                <div className="col-span-6 relative">
                    <Rettangoli className={"absolute bottom-0 left-0 right-0 h-full w-full delta-svg"}/>
                </div>
            </HomeSlide>
            <HomeSlide>
                <div className="col-span-9" style={{letterSpacing: -1}}>
                    The opinion library is a tool that collects comments and shows relations among the <mark>most used words</mark>
                    {' '}in pro mask and no mask comments
                </div>
                <div className="absolute left-8 right-8 bottom-16">
                    <div className=" inline-block">
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
            relativePath
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
}`
