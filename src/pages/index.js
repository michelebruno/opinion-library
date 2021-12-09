import * as React from "react"
import Layout from "../components/Layout";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef} from "react";

gsap.registerPlugin(ScrollTrigger)


// markup
const IndexPage = () => {

    const wrapper = useRef()

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper.current,
                start: 'top top',
                pin: '#pin-me',
                scrub: true,
                snap: {
                    snapTo: 'labels',
                    duration: 0.05
                },
                markers: true,
                end: 'bottom bottom'
            },
            defaults: {
                duration: 0.05
            }
        })

        window.tl = tl

        tl.addLabel('landing')
            .addLabel('seconda')
            .to('#seconda', {
                yPercent: -15,
                opacity: 0,
            }, )
            .from(
                '#terza',
                {
                    yPercent: -15,
                    opacity: 0,
                    // delay: 0.1
                },
            )
            .addLabel('terza')
            .to({}, {duration:.3})
    }, [])

    return (
        <Layout fixedHeader>

            <div className="w-screen h-screen bg-light home-section sticky top-0 z-0" id={"ciao"}>
                <h1 className="text-black text-8xl text-center py-32 ">Two worlds
                    in words</h1>
            </div>
            <div ref={wrapper} className="scroll-wrapper bg-gray-500 h-screen w-screen relative z-10 h-[300vh] text-8xl">
                <div className="home-section" id={'pin-me'}>
                    <p className="  absolute top-0 p-32" id={'seconda'}>Change.org is the largest petition
                        website, and in 2020 it only grew larger,
                        especially in the
                        United States. </p>
                    <p id="terza" className={"absolute top-0 p-32"}>As the platform grew,
                        so did the topics being discussed. One of the most controversial themes has been that of</p>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
