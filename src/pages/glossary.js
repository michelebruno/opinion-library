import React, {useState} from "react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import {Helmet} from "react-helmet";
import classNames from "classnames";
import Comment from "../components/Comment";


function getTextHighlighter(highlight, secondWord) {
    // Split on highlight term and include term into parts, ignore case
    const re = new RegExp(`(${highlight})`)
    return text => {
        const parts = text.split(re, 'gi')

        return <span> {parts.map((part, i) =>
            <span key={i} className={
                part.toLowerCase() === highlight.toLowerCase() ? "bg-promask" :
                    (part.toLowerCase() === secondWord ? 'border-promask border-2' : '')
            }>
            {part}
        </span>)
        } </span>;
    }
}


function getHighlighted(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`), 'gi')

    return <span> {parts.map((part, i) =>
        <span key={i} className={
            part.toLowerCase() === highlight.toLowerCase() ? "bg-promask" : ''
        }>
            {part}
        </span>)
    } </span>;
}

function MaskometerGrid({collapse, chosen, words, distribution, comments}) {
    const highlighter = getTextHighlighter(chosen.current)
    return <div className="">
        <div className={classNames("uppercase flex flex-col justify-between")}>
            {
                words.nodes.map(({name}) => {
                    let delta = distribution.nodes.find(({
                                                             word,
                                                             secondWord
                                                         }) => {

                        if (chosen.next) {
                            return chosen.next === word && secondWord === name
                        }
                        return (chosen.current ? word === chosen.current : word === word) && secondWord === name
                    })['nomaskDelta']

                    delta = Math.round(delta * 100)

                    return <div key={name}
                                className={
                                    classNames(
                                        "w-full relative ",
                                        "before:absolute before:left-0 before:right-0 before:border-b-white my-1",
                                        "before:border-b-[1px] before:block before:top-1/2 before:transition-all",
                                        collapse ? "before:w-0" : "before:w-full"
                                    )
                                }>
                                <span
                                    className={
                                        classNames(
                                            "inline-block p-1 border-[1px]",
                                            name === chosen.current ? "bg-black text-light border-light" : "bg-white text-black text-center ",
                                            "transition-all duration-1000 delay-200",
                                            collapse ? 'rounded-full' : 'rounded-[0] -translate-x-1/2 '
                                        )}
                                    style={!collapse ? {marginLeft: delta + "%"} : undefined}>
                                    {name}
                                </span>
                    </div>
                })
            }
        </div>
        <div
            className={classNames("absolute transition-transform top-0 bottom-0 right-0 w-10/12 translate-y-full overflow-y-scroll delay-600 duration-500", collapse && 'transform-none')}
            id={"comments-container"}>
            <div className="grid grid-cols-2 gap-8 justify-around">
                {['promask', 'nomask'].map(origin =>
                    <div className="grid gap-8">
                        {comments
                            .filter(({origin: o}) => origin === o)
                            .map(
                                ({extracted, ...c}) => <Comment key={c.id} extracted={extracted} word={chosen.current} {...c} />
                            )}

                    </div>)}
            </div>
        </div>
    </div>
}


export default function Glossary({data: {words, distribution, allComments}}) {
    const [chosen, setChosen] = useState({})
    const [showComments, setShowComments] = useState(false)

    return <Layout wrapperClassName={"h-screen flex flex-col overflow-hidden py-8"}
                   className={"h-full flex-grow-0 flex-shrink flex "}>
        <div className="w-3/12 overflow-y-scroll pb-64">
            <h1 className="text-light bg-black  uppercase text-3xl px-8 py-6 border-b-2 border-light sticky top-0">
                Glossary
            </h1>
            <ul>
                {words.nodes.map(({name, link}) => <li
                    key={name}
                    onMouseEnter={() => setChosen(
                        c => ({current: c.current, next: name})
                    )}
                    onMouseLeave={() => setChosen(c => ({...c, next: undefined}))}
                    onClick={() => setChosen({current: name})}
                    className={classNames("text-4xl uppercase",
                        "px-8 py-6",
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
        <div className="flex-grow flex flex-col relative ">
            <div className="w-full px-8 flex justify-between uppercase text-xl">
                <span className={"bg-nomask p-1"}>No</span>
                <span className={"bg-promask p-1"}>Pro</span>
            </div>

            <MaskometerGrid collapse={showComments} chosen={chosen} words={words} distribution={distribution}
                            comments={allComments.nodes.filter(({word}) => word === chosen.current)}/>

            <div className={"flex "}>
                <button className={!showComments && 'hidden'} onClick={() => setShowComments(false)}>
                    - Relations
                </button>
                <button className={showComments && 'hidden'} onClick={() => setShowComments(true)}>
                    Read comments ->
                </button>
            </div>
        </div>
    </Layout>
}

export const query = graphql`query Glossary {
    words: allSheetsScatter(limit: 20){
        nodes{
            name
            link : gatsbyPath(filePath: "/glossary/{SheetsScatter.name}")
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
