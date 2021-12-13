import * as React from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {CSSRulePlugin} from "gsap/CSSRulePlugin"
import {CSSPlugin} from "gsap/CSSPlugin"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {TextPlugin} from "gsap/TextPlugin"
import {forwardRef, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {graphql, Link} from "gatsby";
import Image from "../components/Image";
import Comment, {HighlightedWord} from "../components/Comment";
import DeltaWord from "../components/DeltaWord";
import Button from "../components/Button";
import HomeSlide from "../components/HomeSlide";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(TextPlugin, CSSPlugin, CSSRulePlugin)

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
let wheelEvent = typeof document ==='undefined' || 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    if (typeof window === 'undefined') return
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    // console.log("scroll disabled")
}


// call this to Enable
function enableScroll() {
    if (typeof window === 'undefined') return

    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);

    // console.log("scroll enabled")
}


function SlotMaschine({words}) {
    return <div className="p-8 overflow-hidden h-[2em] rounded-full border-2 border-white inline-block">
        <div className="overflow-hidden inline-block h-[1em]" id={"slot-machine"}>
            <div className="slot-content w-auto">
                {
                    [
                        ...words.nodes.map(i => i.name),
                        ...words.nodes.map(i => i.name),
                        'mask mandate',
                    ].map((w, i) => <span className="block w-auto" key={i}>{w}</span>)
                }
            </div>
        </div>
    </div>
}


const homeComments = [
    {
        splitted: ['I have the ', 'vaccine', ' I need to make sure it’s working can’t do that wearing masks!!!'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'vaccine',
        dateText: '1 year ago',
        author: 'User34'
    },
    {
        splitted: ['I’m capable of making my own personal ', 'health choices', '.'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'health choices',
        dateText: '23/04/2020',
        author: 'User34'
    },
    {
        splitted: ['Not everyone who wants to get the ', 'vaccine', ' has the access to it yet.'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'vaccine',
        dateText: '23/04/2020',
        author: 'User34'
    },
    {
        splitted: ['My #1 priority is the ', 'health', ' and safety of my children, and yours!'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'health',
        dateText: '23/04/2020',
        author: 'User34'
    },
    {
        splitted: ['Adults who want the ', 'vaccine', ' have been afforded the opportunity to receive it.'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'vaccine',
        dateText: '23/04/2020',
        author: 'User34'
    },
    {
        splitted: ['At this stage, ', 'masks', ' serve no purpose and this should be a family choice!'],
        user: 'User55',
        petitionTitle: 'Broken Arrow Mask Mandate Rejection',
        word: 'masks',
        dateText: '23/04/2020',
        author: 'User34'
    },
]

// markup
const IndexPage = ({data: {allFile, words, comments}}) => {

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
            onStart: disableScroll,
            onComplete: enableScroll
        })
            .from(
                changeDataSlide.current.querySelector('h2'), {
                    opacity: 0,
                }
            )
            .from('#change-data-bubbles > div', {
                y: 1900,
                stagger: .5,
                duration: 2,
                // ease: 'linear',
                onStart: disableScroll,
                onComplete: enableScroll
            })


        let slotMachine = gsap.to('#slot-machine div', {
            yPercent: -100 * (65 * 2 - 1) / (65 * 2),
            ease: 'power4.out',
            paused: true,
            duration: 1,
            delay: .3,
            onStart: disableScroll,
            onComplete: enableScroll,
            scrollTrigger: {
                trigger: '#slot-machine',
                once: true,
                // start: 'top center'
            }
        })


        let maskMandateTl = gsap.timeline({
            scrollTrigger: {
                trigger: maskMandateSlide.current,
                // scrub: 0.3,
                start: 'top top',
                pin: maskMandateSlide.current.querySelector('.pin-me'),
                pinSpacer: maskMandateSlide.current.querySelector('.pin-spacer'),
                end: 'bottom bottom',
            }
        })

        // WHY YOU SIGNED
        let commentAnimation = gsap.to('#fake-comment .comment-text', {
            text: {
                value: 'Those who signed these petitions explained their reasons in comments.'
            },
            duration: 3,
            ease: 'linear',
            paused: true,
            onStart: disableScroll,
            onComplete: enableScroll
        })

        ScrollTrigger.create({
            trigger: whyYouSigned.current,
            onEnter: () => commentAnimation.play()
        })

        // THIS LETS US UNDERSTAND

        let commentFadeIn = gsap.from(
            gsap.utils.toArray(understandLanguage.current.querySelectorAll('.comment-container .comment')),
            {
                yPercent: 20,
                opacity: 0,
                stagger: .3,
                paused: true,
                onComplete: enableScroll
            }
        )

        gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current,
                    scrub: true,
                    end: 'bottom bottom',
                    pin: understandLanguage.current.querySelector('.pin-me'),
                    pinSpacer: understandLanguage.current.querySelector('.pin-spacer'),
                }
            }
        )
            .call(() => {
                disableScroll()
                commentFadeIn.play()
            })
            .from('#recurring-words', {
                y: 300,
                opacity: 0,
                duration: .5,
            })
            .to({}, {duration: 1.5})

        gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current.querySelector('.snapper:nth-child(3)'),
                    scrub: true,
                    onEnter: () => setHighlightWords(true),
                    onLeaveBack: () => setHighlightWords(false)
                }
            }
        )

        let panels = gsap.utils.toArray(".snapper"),
            scrollTween;

        function goToSection(i) {
            let scrollTo = {
                y: i * window.innerHeight,
                autoKill: false
            }
            scrollTween = gsap.to(window, {
                scrollTo,
                duration: 1,
                onStart: disableScroll,
                onComplete: () => {
                    scrollTween = null
                    enableScroll()
                },
                overwrite: true
            });
        }

        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top bottom",
                end: "+=200%",
                onToggle: self => self.isActive && !scrollTween && goToSection(i)
            });
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                scrub: true,
                snap: {
                    snapTo: 1 / (panels.length + 1),
                    ease: 'linear',
                    inertia: false,
                    delay: 0,
                }
            }
        })
            .from('#progress-bar', {
                scaleY: 0,
                duration: 1,
                ease: 'linear'
            })


    }, [])

    return (
        <Layout fixedHeader className={"text-[4.34vw] leading-tight"}>
            <div className="fixed left-0 top-0 bottom-0 origin-top bg-light w-2 z-40" id="progress-bar"></div>
            <HomeSlide className={"bg-light pb-32 text-[6vw] grid-rows-6 z-50"}>
                <h1 className="text-black text-center col-span-12 row-start-3 self-end ">Opinion Library</h1>
                <div className="absolute left-0 right-0 bottom-0 py-8 text-center text-xl normal-case text-black">
                    <p>
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
                    Change.org is the largest petition website, and in 2020 it only grew larger,
                    especially in the United States.
                </h2>
                <div id={'change-data-bubbles'}
                     className="text-black text-center normal-case absolute h-full w-full inset-0">
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[-30deg] " +
                                "bg-light rounded-full " +
                                "flex items-center justify-center " +
                                "w-[50vmin] h-[50vmin] " +
                                "absolute right-8 bottom-[15%] "
                            )}>
                        <div>
                            <p className={"text-2xl"}>+208,5%</p>
                            <p className="text-xl">Signatures</p>
                        </div>
                    </div>
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[40deg] " +
                                "bg-light rounded-full " +
                                "flex items-center justify-center " +
                                "w-[20vmin] h-[20vmin] " +
                                "absolute left-32 bottom-[12%] "
                            )}>
                        <div>
                            <p className={"text-2xl"}>+33%</p>
                            <p className="text-xl">Global Users</p>
                        </div>
                    </div>
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[5deg] " +
                                "bg-light rounded-full " +
                                "flex items-center justify-center " +
                                "w-[20vmin] h-[20vmin] " +
                                "absolute left-[40%] bottom-[2%] "
                            )}>
                        <div>
                            <p className={"text-2xl"}>+46%</p>
                            <p className="text-xl">Published Petitions</p>
                        </div>
                    </div>

                </div>

            </HomeSlide>
            <HomeSlide span={2} ref={maskMandateSlide}>
                <div className="col-span-12 pin-spacer">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">

                        <h2 className={"col-span-10"}>
                            As the platform grew,
                            so did the topics being discussed. One of the
                            most controversial
                            themes has been that of <br/>
                            <SlotMaschine words={words}/>
                        </h2>
                    </div>
                </div>

                <div className={"absolute h-screen w-screen bottom-0"}>
                    <div className="relative h-full w-full">
                        <Image image={allFile.nodes[0]} className={"w-2/5 absolute top-0 left-0"}/>
                        <Image image={allFile.nodes[1]} className={"w-2/5 absolute top-1/3 left-2/3"}/>
                        <Image image={allFile.nodes[2]} className={"w-2/5 absolute top-2/3 left-2/4"}/>
                        <Image image={allFile.nodes[3]} className={"w-2/5 absolute top-0 left-0"}/>
                        <Image image={allFile.nodes[4]} className={"w-2/5 absolute top-1/4 left-1/4"}/>
                        <Image image={allFile.nodes[5]} className={"w-2/5 absolute top-1/2 -left-1/4"}/>
                        <Image image={allFile.nodes[6]} className={"w-2/5 absolute -bottom-4 -left-1/5"}/>

                    </div>
                </div>
            </HomeSlide>
            <HomeSlide className={"auto-rows-min"} id={"why-you-signed"} ref={whyYouSigned}>
                <div className="col-span-9 col-start-3 ">
                    <p className="text-5xl text-right pb-8">
                        Why they have signed
                    </p>
                    <Comment id={'fake-comment'} author="User33" dateText={"1 minute ago"}
                             petitionTitle="Mask mandate petition" large origin={'black'}>
                    </Comment>
                </div>
            </HomeSlide>
            <HomeSlide span={3} className={"auto-rows-min"} id={"understand-language"} ref={understandLanguage}>
                <div className="col-span-12 pin-spacer">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">
                        <div className={"col-span-8 relative "}>
                            <p id={'this-allows'}>
                                This allows us to understand the different points of view and the language used to
                                express them.
                            </p>
                            <p id={'recurring-words'} className={''}>
                                We can find recurring
                                <HighlightedWord isActive={highlightWords}
                                                 className={highlightWords && 'text-black'}>words</HighlightedWord> in
                                these comments.
                            </p>

                        </div>
                        <div className="col-span-4  normal-case overflow-hidden">
                            <div className="grid auto-rows-min gap-y-4 comment-container">
                                {
                                    homeComments.map(comment => <Comment key={comment.text}
                                                                         highlightWords={highlightWords}
                                                                         origin={'black'} {...comment} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </HomeSlide>
            <HomeSlide span={1} className={"pb-32"} id={"some-words-frequent"}>

                <div className={"col-span-6"}>
                    <h2>
                        Some words are common but used in different ways by <span
                        className="bg-promask inline-block">Pro mask</span> or
                        {' '}
                        <span className="bg-nomask inline-block">no mask</span> to hold a particular point of
                        view.
                    </h2>
                    <Button as={Link} to={"/glossary"}>View the library</Button>
                </div>
                <div className="col-span-6 relative">
                    <DeltaWord promask={61} rotate={-23} bottom={21}>Family</DeltaWord>
                    <DeltaWord promask={33} bottom={20} right={12} rotate={12}>Mandate</DeltaWord>
                    <DeltaWord promask={51} bottom={35} right={10} rotate={17}>Science</DeltaWord>
                    <DeltaWord promask={55} left={45} top={8} rotate={9}>Health</DeltaWord>
                    <DeltaWord promask={45} bottom={60} rotate={-9} left={10}>Vaccine</DeltaWord>
                    <DeltaWord promask={60} bottom={55} rotate={8} right={8}>Student</DeltaWord>
                    <DeltaWord promask={55} bottom={40} left={13}>School</DeltaWord>
                    <DeltaWord promask={54} bottom={0} rotate={-2}>Teacher</DeltaWord>
                    <DeltaWord promask={32} bottom={0} right={0} rotate={10}>Children</DeltaWord>
                </div>

            </HomeSlide>

        </Layout>
    )
}

export default IndexPage

export const query = graphql`{
    words: allSheetsScatter(limit: 64){
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
    comments: allSheetsEstratti(filter: {commentId: {in: [817756846,811710031,814486694,822518213,817756846, 821382262]}}) {
        nodes {
            ...CommentFragment
        }
    }
}`
