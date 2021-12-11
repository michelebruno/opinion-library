import * as React from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {TextPlugin} from "gsap/TextPlugin"
import {forwardRef, useEffect, useRef} from "react";
import classNames from "classnames";
import {graphql} from "gatsby";
import Image from "../components/Image";
import Comment from "../components/Comment";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(TextPlugin)


let heightClasses = [
    'h-0',
    'h-screen',
    'h-[200vh]',
    'h-[300vh]',
    'h-[400vh]',
]

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

const HomeSlide = forwardRef(({children, className, id, span, uppercase}, ref) => {
    return <div className={classNames(
        "section px-10 w-screen pt-32 overflow-hidden box-border",
        heightClasses[span],
        uppercase && 'uppercase',
        'grid grid-cols-12 gap-16',
        'relative',
        className
    )}
                style={{height: `${span}00 vh`}}
                id={id}
                ref={ref}
    >
        {children}

        <div className="snappers-container absolute inset-0 z-[-1]">
            {
                Array(span).fill(0).map((_zero, index) => <div className="h-screen snapper" key={index}/>)
            }
        </div>

    </div>
})
HomeSlide.defaultProps = {
    span: 1,
    uppercase: true
}


const homeComments = [
    {
        text: 'I have the vaccine I need to make sure it’s working can’t do that wearing masks!!!',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
    {
        text: 'I’m capable of making my own personal health choices.',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
    {
        text: 'Not everyone who wants to get the vaccine has the access to it yet.',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
    {
        text: 'My #1 priority is the health and safety of my children, and yours!',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
    {
        text: 'Adults who want the vaccine have been afforded the opportunity to receive it.',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
    {
        text: 'At this stage, masks serve no purpose and this should be a family choice!',
        user: 'User55',
        petition: {
            title: 'Broken Arrow Mask Mandate Rejection',
            url: ''
        },
        date: '23/04/2020'
    },
]

// markup
const IndexPage = ({data: {allFile, words}}) => {

    const changeDataSlide = useRef()
    const maskMandateSlide = useRef()
    const understandLanguage = useRef()
    const whyYouSigned = useRef()

    useEffect(() => {


        let changeCovidDataTl = gsap.timeline({
            scrollTrigger: {
                trigger: changeDataSlide.current,
                markers: true,
                scrub: true,
                start: 'top top',
                pin: changeDataSlide.current.querySelector('.pin-me'),
                pinSpacer: changeDataSlide.current.querySelector('.pin-spacer'),
                end: 'bottom bottom'
            }
        })

        let slotMachine = gsap.to('#slot-machine div', {
            yPercent: -100 * (65 * 2 - 2) / (65 * 2),
            ease: 'power4.out',
            once: true,
            paused: true,
            duration: 3
        })


        let maskMandateTl = gsap.timeline({
            scrollTrigger: {
                trigger: maskMandateSlide.current,
                scrub: 0.3,
                start: 'top top',
                pin: maskMandateSlide.current.querySelector('.pin-me'),
                pinSpacer: maskMandateSlide.current.querySelector('.pin-spacer'),
                end: 'bottom bottom',
                onEnter: () => slotMachine.play()
            }
        })

        maskMandateTl
            .from({}, {duration: 1})
            .to(gsap.utils.toArray('.absolute img'), {
                stagger: 1,
                yPercent: 10,
                opacity: 0.5,
                duration: 1
            })

        changeCovidDataTl
            .to({}, {duration: 1})
            .to(changeDataSlide.current.querySelector('h2'), {opacity: 0})

        // WHY YOU SIGNED
        let commentAnimation = gsap.to('#fake-comment', {
            text: {
                value: 'Those who signed these petitions explained their reasons in comments.'
            },
            duration: 3,
            paused: true
        })

        ScrollTrigger.create({
            trigger: whyYouSigned.current,
            onEnter: () => commentAnimation.play()
        })

        // THIS LETS US UNDERSTAND
        let wordsHighlithTl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 1
            }
        })

        wordsHighlithTl
            .addLabel('start')
            .to(understandLanguage.current.querySelector('#recurring-words span'), {
                color: 'black',
            }, 'start')
            .call(() => {
                understandLanguage.current.querySelector('#recurring-words span').classList.remove('before:scale-x-0')
            }, [], 'start')


        let commentFadeIn = gsap.from(
            understandLanguage.current.querySelectorAll('.comment-container .comment'),
            {
                yPercent: 20,
                opacity: 0,
                stagger: 1.2,
                delay: 1,
                duration: 1,
                paused: true
            }
        )

        let undestandLanguageTl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: understandLanguage.current,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: understandLanguage.current.querySelector('.pin-me'),
                    pinSpacer: understandLanguage.current.querySelector('.pin-spacer'),
                    onEnter(...args) {
                        console.log(args)
                        commentFadeIn.play()
                    }
                }
            }
        )
            .addLabel('first')
            .from('#recurring-words', {
                y: 300,
                opacity: 0,
                duration: .5,
                onComplete: () => wordsHighlithTl.play()
            })
            .to({}, {duration: 2})

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

        ScrollTrigger.create({
            trigger: 'body',
            markers: true,
            snap: {
                snapTo: 1 / (panels.length + 1),
                ease: 'linear',
                inertia: false,
                delay: 0,
            }
        })

    }, [])

    return (
        <Layout fixedHeader className={"text-[4.34vw] leading-tight"}>
            <HomeSlide className={"bg-light pb-32 text-[6vw] grid-rows-6"}>
                <h1 className="text-black text-center col-span-12 row-start-3 self-end ">Opinion Library</h1>
            </HomeSlide>
            <HomeSlide span={2} ref={changeDataSlide}>
                <div className="col-span-9 pin-spacer">
                    <div className="pin-me w-full">

                        <h2 className={"col-span-9"}>
                            Change.org is the largest petition website, and in 2020 it only grew larger,
                            especially in the United States.
                        </h2>
                    </div>
                </div>
                <div className="text-black text-center  normal-case ">
                    <div
                        className={
                            classNames(
                                "bg-light rotate-[-30deg] " +
                                "bg-light rounded-full " +
                                "flex items-center justify-center " +
                                "w-[50vmin] h-[50vmin] " +
                                "absolute right-8 bottom-[65%] "
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
                                "absolute left-32 bottom-[62%] "
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
                                "absolute left-[40%] bottom-[52%] "
                            )}>
                        <div>
                            <p className={"text-2xl"}>+46%</p>
                            <p className="text-xl">Published Petitions</p>
                        </div>
                    </div>

                </div>

            </HomeSlide>
            <HomeSlide span={2} ref={maskMandateSlide}>
                <div className="col-span-9 pin-spacer">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">

                        <h2 className={"col-span-10"}>
                            As the platform grew,
                            so did the topics being discussed. One of the
                            most controversial
                            themes has been that of
                            <SlotMaschine words={words}/>
                        </h2>


                    </div>
                </div>
            </HomeSlide>
            <HomeSlide className={"auto-rows-min"} id={"why-you-signed"} ref={whyYouSigned}>
                <div className="col-span-9 col-start-2">
                    <p className="text-4xl ">
                        Why have you signed?
                    </p>
                </div>
                <div
                    className="col-span-10 grid grid-cols-10 gap-16 rounded-2xl border-white border-2 py-16 normal-case">
                    <div className="col-span-2">

                    </div>
                    <p className={"col-span-7"} id={"fake-comment"}>
                    </p>

                </div>
            </HomeSlide>
            <HomeSlide span={3} className={"auto-rows-min"} id={"understand-language"} ref={understandLanguage}>
                <div className="col-span-12 pin-spacer">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">
                        <div className={"col-span-8 relative "}>
                            <p id={'this-allows'}>
                                This allows us to understand the different points of view and the language used to
                                express
                                them.
                            </p>
                            <p id={'recurring-words'} className={''}>
                                We can find recurring
                                <span
                                    className={"relative inline-block before:z-[-1] before:transition-all before:duration-1000 before:absolute before:h-full  before:w-full before:bg-light before:origin-left before:scale-x-0"}>
                                    words
                                </span> in
                                these comments.
                            </p>

                        </div>
                        <div className="col-span-4  normal-case overflow-hidden">
                            <div className="grid auto-rows-min gap-y-4 comment-container">
                                {
                                    homeComments.map(comment => <Comment key={comment.text}
                                                                         author={comment.user}>{comment.text}</Comment>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </HomeSlide>
            <HomeSlide span={2} className={"auto-rows-min"} id={"some-words-frequent"}>
                <h2 className={"col-span-6"}>
                    Some words are common but used in different ways by <span
                    className="bg-promask inline-block">Pro mask</span> or
                    {' '}
                    <span className="bg-nomask inline-block">no mask</span> to hold a particular point of view. </h2>
            </HomeSlide>
            <HomeSlide id={"conclusion"}>
                <h2 className="col-span-10">
                    All these words and the related comments have been collected in THE archive. Click on a word to
                    discover how other words relate to it and read the comments mentioning them.
                </h2>
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
            childImageSharp {
                gatsbyImageData
            }
        }
    }
}`
