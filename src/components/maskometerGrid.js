import React, {useState} from "react";
import classNames from "classnames";
import {ArchiveButton} from "./Button";
import {mix} from "../utils/mix";


export function MaskometerGrid({chosen, words, distribution, onClickSecondWord}) {


    return <div className="h-full flex flex-col justify-between relative gap-4  ">
        <p className={"mx-8 mb-4 text-lg"}>
            Horizontal position corresponds to usage by the two groups in the selcted corpus of reasons to sign
        </p>
        <div className="flex-1 ">
            <div
                className={classNames(" h-full px-8 py-4 flex flex-col justify-between relative", 'overflow-hidden')}>
                <div className={"z-1 uppercase"}>

                    <p className="bg-promask text-white text-lg text-center h-full absolute top-0 bottom-0 left-0 rotate-180 p-1 z-10"
                       style={{writingMode: 'vertical-lr'}}>
                        Promask
                    </p>

                    <p className="bg-nomask text-white text-lg text-center h-full absolute top-0 bottom-0 right-0 p-1 z-10"
                       style={{writingMode: 'vertical-rl'}}>
                        Nomask
                    </p>

                    <div
                        className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 border-r-[1px] boreder-r-white border-dashed opacity-50"/>

                    <p className="text-lg text-sm 2xl:text-base text-center text-gray select-none absolute top-0 left-0 right-0 w-full normal-case bg-black pb-2"
                    >
                        equally used
                    </p>

                </div>

                {(typeof chosen !== 'undefined' && chosen.current) ?
                    words.nodes.map(({name}) => {

                        let isCurrent = chosen.next ? chosen.next === name : chosen.current === name


                        let delta = distribution
                            .find(({
                                       word,
                                       secondWord
                                   }) => {

                                if (chosen.next) {
                                    return chosen.next === word && secondWord === name
                                }
                                return (chosen.current && word === chosen.current) && secondWord === name
                            })['nomaskDelta']

                        delta = Math.round(delta * 100)

                        return <div key={name}
                                    className={
                                        classNames(
                                            "w-full flex items-center relative",
                                            "before:absolute before:left-0 before:right-0 ",
                                            "before:border-b-[1px] before:block before:top-1/2 before:transition-all",
                                            "before:w-full transition-[margin,background-color] duration-500",
                                            isCurrent ? 'before:border-b-gray  opacity-30' : 'before:border-b-current  before:opacity-20'
                                        )
                                    }>
                            <ArchiveButton
                                isCurrent={isCurrent}
                                style={{
                                    marginLeft: delta + "%",
                                    '--gradient-mix': isCurrent ? undefined : mix('EA3C9A', '3514FF', delta)
                                }}
                                className={"transition-[margin] duration-1000 rounded-[0px] -translate-x-1/2 absolute z-20"}
                                onClick={() => onClickSecondWord(name)}
                            >
                                {name}
                            </ArchiveButton>
                        </div>
                    }) : <div className="p-20 text-7xl w-3/4 opacity-50 upppercase">
                        click on one of the most used words to see how the related words are used by the two groups
                        in the comments
                    </div>
                }
            </div>

        </div>
    </div>
}