import * as React from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {forwardRef, useEffect, useRef} from "react";
import classNames from "classnames";
import {graphql} from "gatsby";
import Image from "../components/Image";

gsap.registerPlugin(ScrollTrigger)

function getSnapArray(...amounts) {
    let sum = amounts.reduce((p, c) => p + c, 0)

    let fr = 1 / (sum)

    let arr = [0]

    amounts.forEach((v, i) => arr.push(v * fr + arr[i]))

    return arr
}

let heightClasses = [
    'h-0',
    'h-screen',
    'h-[200vh]',
    'h-[300vh]',
    'h-[400vh]',
]

function SlotMaschine({words}) {
    return <div className="p-8 overflow-hidden h-[2em] rounded-full border-2 border-white ">
        <div className="overflow-hidden h-[1em]" id={"slot-machine"}>
            <div className="slot-content inline-block">
                {
                    [
                        ...words.nodes.map(i => i.name),
                        ...words.nodes.map(i => i.name),
                        'mask mandate',
                    ].map((w, i) => <span className="block" key={i}>{w}</span>)
                }
            </div>
        </div>
    </div>
}

const HomeSlide = forwardRef(({children, className, id, span, uppercase}, ref) => {
    return <div className={classNames(
        "section px-10 w-screen pt-32",
        heightClasses[span],
        uppercase && 'uppercase',
        'grid grid-cols-12 gap-16',
        className
    )}
                style={{height: `${span}00 vh`}}
                id={id}
                ref={ref}
    >
        {children}
    </div>
})
HomeSlide.defaultProps = {
    span: 1,
    uppercase: true
}

// markup
const IndexPage = ({data: {allFile, words}}) => {

    const changeDataSlide = useRef()
    const maskMandateSlide = useRef()

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
            yPercent: -100 * (65 * 2- 2) / (65 * 2),
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

        ScrollTrigger.create({
            trigger: 'body',
            markers: true,
            snap: {
                snapTo: getSnapArray(1, 1, 1, 1, 3),
                ease: 'linear',
                inertia: false,
                delay: 0,
            }
        })

    }, [])

    return (
        <Layout fixedHeader className={"text-7xl"}>
            <HomeSlide className={"bg-light"}>
                <h1 className="text-black text-8xl text-center py-32 col-span-9 ">Two worlds
                    in words</h1>
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
            </HomeSlide>
            <HomeSlide span={3} ref={maskMandateSlide}>
                <div className="col-span-9 pin-spacer">
                    <div className="pin-me w-full grid grid-cols-12 gap-16 relative">

                        <h2 className={"col-span-9"}>
                            As the platform grew,
                            so did the topics being discussed. One of the
                            most controversial
                            themes has been that of
                            <SlotMaschine words={words}/>
                        </h2>

                        <div className={"col-span-12 relative"}>
                            {[0, 0, 0].map((_, i) => {
                                return <div key={i} className={"w-1/2 absolute"}
                                            style={{marginLeft: (i * 100 / 3) + "%"}}>
                                    <Image image={allFile.nodes[0]}/>
                                </div>
                            })}
                        </div>
                    </div>
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
            childImageSharp {
                gatsbyImageData
            }
        }
    }
}`
