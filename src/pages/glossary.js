import React, {useState} from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import classNames from "classnames";
import WordsIndex from "../components/WordsIndex";
import Accordion from "../components/Accordion";
import {MaskometerGrid} from "../components/maskometerGrid";


export default function Glossary({data: {words, distribution, allComments}}) {
    const [chosen, setChosen] = useState({})
    const [showComments, setShowComments] = useState(false)

    return <Layout wrapperClassName={"max-h-screen h-screen flex flex-col"}
                   className={"flex-1 min-h-0 "}>
        <div className="w-full h-full overflow-hidden flex whitespace-nowrap">
            <WordsIndex words={words.nodes} chosen={chosen} setChosen={setChosen}/>
            <div className={classNames(
                'transition-[width] duration-1000 overflow-hidden flex flex-col ',
                chosen.current ? 'w-10/12' : 'w-0'
            )}>
                <Accordion title={"Maskometer"} isOpen={!showComments} onClick={() => setShowComments(!showComments)}>

                    <MaskometerGrid chosen={chosen} words={words} distribution={distribution}
                                    comments={allComments.nodes.filter(({word}) => word === chosen.current)}/>
                </Accordion>
                <Accordion title={"Comments"} isOpen={showComments} onClick={() => setShowComments(!showComments)} >
                    <div className="h-full w-full bg-orange-900">
                        ciao
                    </div>
                </Accordion>
            </div>
        </div>

        <div className="grid grid-cols-12 h-full overflow-hidden hidden">
            <div className="col-span-2 overflow-y-scroll border-r-2 border-white">

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
                            className={classNames("text-xl uppercase",
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
    distribution: allSheetsDistribuzioneV2 {
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
