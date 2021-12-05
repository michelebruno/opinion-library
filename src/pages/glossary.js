import React, {useState} from "react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import {Helmet} from "react-helmet";
import classNames from "classnames";

export default function Glossary({data: {words, distribution}}) {
    const [chosen, setChosen] = useState({})
    return <Layout>

        <div className="grid grid-cols-5 h-3/4 w-full ">
            <div className="flex flex-col overflow-y-scroll max-h-full">
                <h1 className="text-light uppercase text-3xl px-8 py-6 border-b-2 border-light sticky top-0">
                    Glossary
                </h1>
                <ul className={""}>
                    {words.nodes.map(({name, link}) => <li
                        key={name}
                        onMouseEnter={() => setChosen(
                            c => ({prev: c.current, current: name})
                        )}
                        onMouseLeave={() => setChosen(c => ({current: c.prev}))}
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
            <div className="col-span-4 sticky top-10 flex flex-col ">
                <div className="w-full px-8 flex justify-between uppercase text-xl">
                    <span className={"bg-nomask p-1"}>No</span>
                    <span className={"bg-promask p-1"}>Pro</span>
                </div>
                <div
                    className="uppercase">
                    {
                        words.nodes.map(({name}) => {
                            let delta = distribution.nodes.find(({
                                                                     word,
                                                                     secondWord
                                                                 }) => (chosen.current ? word === chosen.current : word === word) && secondWord === name)['nomaskDelta']

                            delta = Math.round(delta * 100)

                            return <div key={name}
                                        className={"w-full my-1 flex-grow relative before:w-full before:absolute before:left-0 before:right-0 before:border-b-white before:border-b-[1px] before:block before:top-1/2"}>
                                <span
                                    className={
                                        classNames(
                                            "inline-block p-1 ",
                                            name === chosen.current ? "bg-black text-light border-[1px] border-light" : "bg-white text-black text-center ",
                                            "-translate-x-1/2 transition-all duration-1000 delay-200"
                                        )}
                                    style={{marginLeft: delta + "%"}}>
                                    {name}
                                </span>
                            </div>
                        })
                    }
                </div>
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
}`
