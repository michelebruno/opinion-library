import React, {useEffect, useState} from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import classNames from "classnames";
import Comment from "../components/Comment";


function MaskometerGrid({chosen, words, distribution, comments}) {
    const [collapse, setCollapse] = useState(false)

    const [secondWord, setSecondWord] = useState()

    useEffect(() => {
        if (collapse) {
            setSecondWord()
        }
    }, [collapse])

    return <div className="flex-grow min-h-0 flex flex-col justify-between relative gap-4 ">
        <div className={classNames("w-full flex uppercase text-xl sticky top-0")}>
            <div className={classNames('transform', !collapse ? 'w-0' : 'w-2/12')}></div>
            <div className={classNames("flex-1 flex ", !collapse ? 'justify-between' : 'justify-around')}>
                <span className={"bg-promask p-1"}>Pro</span>
                <span className={"bg-nomask p-1"}>No</span>
            </div>
        </div>
        <div className="flex-1">
            <div
                className={classNames("h-full flex flex-col justify-between relative", collapse ? 'overflow-y-scroll' : 'overflow-hidden')}>
                <div className={"sticky top-0 uppercase"}>

                    {
                        words.nodes.map(({name, deltaPromask}) => {
                            let delta = distribution.nodes.find(({
                                                                     word,
                                                                     secondWord
                                                                 }) => {

                                if (chosen.next) {
                                    return chosen.next === word && secondWord === name
                                }
                                return (chosen.current ? word === chosen.current : word === word) && secondWord === name
                            })['promaskDelta']

                            let isCurrent = name === chosen.current
                            let isSelected = name === secondWord
                            if (isCurrent) {
                                delta = deltaPromask
                            }

                            delta = Math.round(delta * 100)


                            return <div key={name}
                                        className={
                                            classNames(
                                                "w-full relative ",
                                                "before:absolute before:left-0 before:right-0 my-1",
                                                "before:border-b-[1px] before:block before:top-1/2 before:transition-all",
                                                collapse ? "before:w-0" : "before:w-full",
                                                isCurrent ? 'before:border-b-light' : 'before:border-b-white'
                                            )
                                        }>
                                <button
                                    disabled={!collapse || isCurrent}
                                    onClick={() => setSecondWord(isSelected ? undefined : name)}
                                    className={
                                        classNames(
                                            "inline-block py-1 px-3 text-lg border-[1px] uppercase text-center",
                                            "transition-[margin] duration-1000 delay-200",
                                            collapse ? 'rounded-full' : 'rounded-[0px] -translate-x-1/2',
                                            !isCurrent && !isSelected &&
                                            (collapse ? 'bg-black text-white hover:text-black hover:bg-white' : 'text-white bg-black'),
                                            isCurrent && "bg-black text-light border-light",
                                            isSelected && "bg-white text-black border-white"
                                        )}
                                    style={{
                                        marginLeft: !collapse ? delta + "%" : undefined,
                                        // backgroundColor: mix('6147FF', 'CFFF58', delta)
                                    }}>
                                    {name}
                                </button>
                            </div>
                        })
                    }
                </div>
                <div
                    className={classNames("absolute transition-transform top-0 bottom-0 right-0 w-9/12 translate-y-full delay-600 duration-500", collapse && 'transform-none')}
                    id={"comments-container"}>
                    <div className="grid grid-cols-2 gap-8 justify-around">
                        {['promask', 'nomask'].map(origin =>
                            <div className={"flex flex-col gap-8 pb-64 "}>
                                {comments
                                    .filter(({origin: o}) => origin === o)
                                    .map(
                                        ({extracted, ...c}) => <Comment key={c.id}
                                                                        extracted={extracted}
                                                                        word={chosen.current}
                                                                        secondWord={secondWord} {...c} />
                                    )}

                            </div>)}
                    </div>
                </div>
            </div>

        </div>
        <div className={"flex sticky bottom-0"}>
            <button className={!collapse && 'hidden'} onClick={() => setCollapse(false)}>
                - Relations
            </button>
            <button className={collapse && 'hidden'} onClick={() => setCollapse(true)}>
                Read comments ->
            </button>
        </div>
    </div>
}


export default function Glgaossary({data: {words, distribution, allComments}}) {
    const [chosen, setChosen] = useState({})


    return <Layout wrapperClassName={"max-h-screen h-screen flex flex-col "}
                   className={"flex-1 min-h-0 "}>
        <div className="flex h-full overflow-hidden gap-8">
            <div className="w-3/12 overflow-y-scroll border-r-2 border-white">
                <h1 className="text-light bg-black  uppercase text-3xl px-8 py-8 border-b-2 border-light sticky top-0">
                    Glossary
                </h1>
                <ul>
                    {words.nodes
                        .filter(i => i.scelta === 'x')
                        .map(({name, link}) => <li
                            key={name}
                            onMouseEnter={() => setChosen(
                                c => ({current: c.current, next: name})
                            )}
                            onMouseLeave={() => setChosen(c => ({...c, next: undefined}))}
                            onClick={() => setChosen({current: name})}
                            className={classNames("text-2xl uppercase",
                                "px-8 py-8",
                                "border-b-2 border-white cursor-pointer",
                                "hover:bg-light hover:text-black",
                                chosen.current === name && "bg-light text-black"
                            )}
                        >
                        <span href={link} onClick={e => {
                            e.preventDefault();
                        }}>{name}</span>
                        </li>)}
                </ul>
            </div>
            <MaskometerGrid chosen={chosen} words={words} distribution={distribution}
                            comments={allComments.nodes.filter(({word}) => word === chosen.current)}/>
        </div>
    </Layout>
}

export const query = graphql`query Glossary {
    words: allSheetsScatter(limit: 20){
        nodes{
            name
            scelta
            deltaPromask
        }
    }
    distribution: allSheetsDistribuzione {
        nodes {
            word
            secondWord
            nomaskDelta
            promaskDelta
        }
    }
    allComments: allSheetsEstratti(filter: {scelto: {eq: "x"}}) {
        nodes {
            ...CommentFragment
        }
    }
}`
