import * as React from "react"
import {useEffect, useRef, useState} from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {CSSRulePlugin} from "gsap/CSSRulePlugin"
import {CSSPlugin} from "gsap/CSSPlugin"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {TextPlugin} from "gsap/TextPlugin"
import classNames from "classnames";
import {graphql, Link} from "gatsby";
import Image from "../components/Image";
import Comment, {HighlightedWord} from "../components/Comment";
import DeltaWord from "../components/DeltaWord";
import Button from "../components/Button";
import HomeSlide from "../components/HomeSlide";
import SlotMaschine from "../components/SlotMaschine";

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
let wheelEvent = typeof document === 'undefined' || 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

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
    {
        splitted: ['I don\'t want anyone else to die while waiting for their ', 'vaccine', '.'],
        user: 'User55',
        petitionTitle: 'Reinstate the Texas Covid-19 Mask Mandate',
        word: 'vaccine',
        dateText: '8 months ago',
        author: 'User34'
    },
    {
        splitted: ['I miss being able to hug my ', 'family', '.'],
        user: 'User55',
        petitionTitle: 'Reinstate the Texas Covid-19 Mask Mandate',
        word: 'family',
        dateText: '8 months ago',
        author: 'User34'
    },
    {
        splitted: ['Sadly, it won\'t be taken seriously until it affects their ', 'family', '.'],
        user: 'User55',
        petitionTitle: 'Make face masks mandatory in public, in Duluth, MN during the COVID-19 pandemic.\n',
        word: 'family',
        dateText: '8 months ago',
        author: 'User34'
    },
    {
        splitted: ['As a high ', 'risk', ' family, I ask that you reconsider lifting the mandate.'],
        user: 'User55',
        petitionTitle: 'Make face masks mandatory in public, in Duluth, MN during the COVID-19 pandemic.\n',
        word: 'risk',
        dateText: '8 months ago',
        author: 'User34'
    },
]

// markup
const IndexPage = ({data: {allFile, words, comments, front}}) => {

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
                    duration: .7
                }
            )
            // .to({}, {duration: .3})
            .from('#change-data-bubbles > div', {
                y: 1300,
                stagger: .2,
                duration: 1,
                // ease: 'linear',
                onStart: disableScroll,
                onComplete: enableScroll
            })


        let petitionImagesTl = gsap
            .from(gsap.utils.toArray(maskMandateSlide.current.querySelectorAll('img')), {
                paused: true,
                opacity: 0,
                y: 20,
                duration: .2,
                stagger: .1,
                onStart: disableScroll,
                onComplete: enableScroll
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

        gsap.timeline({
            scrollTrigger: {
                trigger: '#some-words-frequent',
                onEnter: () => console.log('entered last slide')
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
            .call(disableScroll)
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
                duration: 1,
            }, 'comment-apper')
            .to({}, {
                delay: 2,
                onComplete() {
                    setHighlightWords(true)
                    enableScroll()
                }
            }, 'comment-apper')


        let panels = gsap.utils.toArray(".snapper"),
            scrollTween;

        function goToSection(i) {
            scrollTween = gsap.to(window, {
                scrollTo: {y: i * window.innerHeight, autoKill: false},
                duration: 1,
                onComplete: () => scrollTween = null,
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

        // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
        gsap.timeline({
            scrollTrigger: {
                start: 0,
                end: "max",
                snap: 1 / (panels.length - 1)
            }
        })
            .from('#progress-bar', {
                scaleY: 0
            })

    }, [])

    return (
        <Layout fixedHeader className={"text-[4.34vw] leading-tight"}>
            <div className="fixed right-0 top-0 bottom-0 origin-top bg-light w-2 z-40" id="progress-bar"></div>
            <HomeSlide className={"bg-light pb-32 text-[6vw] grid-rows-6 z-50 select-none"}>
                <Image image={front.nodes[2]} className={"absolute left-[8.3%] top-16 w-1/6"}/>
                <Image image={front.nodes[0]} className={"absolute right-16 top-8 w-1/6"}/>
                <Image image={front.nodes[3]} className={"absolute right-20 bottom-32 w-1/6"}/>
                <Image image={front.nodes[1]} className={"absolute left-20 bottom-60 w-1/6"}/>
                <div className="text-black text-center col-span-12 row-start-3 row-span-2 self-middle">
                    <h1 className={"text-9xl"}>Opinion Library</h1>
                    <h2 className={"text-2xl normal-case"}>What do change.org users think about mask mandates in the
                        U.S.?</h2>
                </div>
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
                    <mark>Change.org</mark>
                    {" "}
                    is the largest petition website, and in 2020 <span
                    className="inline-block">it only grew</span> larger,
                    especially in the United States.
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
                                "absolute right-0 bottom-[15%] "
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
                                "absolute right-[66%] bottom-[16%] "
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
                                "absolute left-[41%] bottom-[4%] "
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
                        <h2 className={"col-span-8"}>
                            As the platform grew,
                            so did the topics being discussed. One of the
                            most <mark>controversial
                            themes</mark> has been that of <br/>
                            <SlotMaschine words={words}/>
                        </h2>
                        <div className={"absolute h-screen w-full top-0 left-0 right-0"}>
                            <div className="relative h-full w-full">
                                <Image image={allFile.nodes[0]} className={"w-1/3 absolute top-0 left-0"}/>
                                <Image image={allFile.nodes[1]} className={"w-1/3 absolute top-1/3 left-2/3"}/>
                                <Image image={allFile.nodes[2]} className={"w-1/3 absolute top-2/3 left-3/4"}/>
                                <Image image={allFile.nodes[3]} className={"w-1/3 absolute top-1/2 left-0"}/>
                                <Image image={allFile.nodes[4]} className={"w-1/3 absolute top-1/4 left-1/4"}/>
                                <Image image={allFile.nodes[5]} className={"w-1/3 absolute top-1/2 right-1/4"}/>
                                <Image image={allFile.nodes[6]} className={"w-1/3 absolute bottom-20 -left-4"}/>
                                <Image image={allFile.nodes[7]} className={"w-1/3 absolute top-5 -right-2"}/>
                                <Image image={allFile.nodes[8]} className={"w-1/3 absolute -top-4 left-1/3"}/>

                            </div>
                        </div>
                    </div>

                </div>
            </HomeSlide>
            <HomeSlide className={"auto-rows-min content-center pb-32"} id={"why-you-signed"} ref={whyYouSigned}>
                <div className="col-span-9 col-start-3 aspect-[16/7]">
                    <p className="pb-8">
                        <mark>Why</mark>{" "}
                        they have signed
                    </p>
                    <Comment id={'fake-comment'} author="User30130" dateText={"1 minute ago"}
                             petitionTitle="Mask mandate petition" large origin={'black'}>
                        Those who signed these petitions explained their reasons in comments.
                    </Comment>
                </div>
            </HomeSlide>
            <HomeSlide span={1} className={"auto-rows-min"} id={"understand-language"} ref={understandLanguage}>

                <div className={"col-span-8 relative "}>
                    <p id={'this-allows'}>
                        This allows us to understand the different points of view and the <mark>language</mark> used to
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
                    <div
                        className="grid auto-rows-min gap-y-4 comment-container absolute top-0 pt-32 h-screen overflow-y-scroll no-scrollbar ">
                        {
                            homeComments.map(comment => <Comment key={comment.splitted}
                                                                 highlightWords={highlightWords}
                                                                 origin={'black'} {...comment} />)
                        }
                    </div>
                </div>
            </HomeSlide>
            <HomeSlide span={1} className={"pb-32"} id={"some-words-frequent"}>

                <div className={"col-span-6"}>
                    <h2 className={"mb-4"}>
                        Some words are common but used in different ways by <span
                        className="bg-promask inline-block">Pro mask</span> or
                        {' '}
                        <span className="bg-nomask inline-block">no mask</span> to hold a particular point of
                        view.
                    </h2>
                    <Button id="view-library-button" as={Link} to={"/glossary"} large>View the library</Button>
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
    comments: allSheetsEstratti(filter: {commentId: {in: [817756846,811710031,814486694,822518213,817756846, 821382262]}}) {
        nodes {
            ...CommentFragment
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
