import React, {useState} from "react";
import classNames from "classnames";
import {ArchiveButton} from "./Button";
import {mix} from "../utils/mix";


export function MaskometerGrid({chosen, words, distribution}) {
    const [secondWord, setSecondWord] = useState()


    return <div className="h-full flex flex-col justify-between relative gap-4  ">
        <p className={"mx-8 mb-3 text-base"}>
            Horizontal position corresponds to usage by the two groups in comments mentioning the word
            {" "}
            <span className="underline">{chosen.next || chosen.current}</span>
        </p>
        <div className="flex-1 ">
            <div
                className={classNames(" h-full px-8 py-4 flex flex-col justify-between relative", 'overflow-hidden')}>
                <div className={"z-1 uppercase"}>

                    <p className="bg-promask text-white text-lg text-center h-full absolute top-0 bottom-0 left-0"
                       style={{writingMode: 'vertical-lr'}}>
                        Promask
                    </p>

                    <p className="bg-nomask text-white text-lg text-center h-full absolute top-0 bottom-0 right-0"
                       style={{writingMode: 'vertical-rl'}}>
                        Nomask
                    </p>

                    <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 border-r-[1px] boreder-r-white border-dashed opacity-20"></div>

                    <p className="text-lg text-xs text-center h-full absolute top-0 bottom-0 right-1/2 translate-x-1/2 rotate-180 normal-case
                    before:border-b-[1px] before:opacity-20 before:block before:top-1/2 before:transition-all"
                       style={{writingMode: 'vertical-rl'}}>
                        equally used
                    </p>

                 </div>

                {(typeof chosen !== 'undefined' && chosen.current) ?
                    words.nodes.map(({name, deltaPromask}) => {

                        let isCurrent = chosen.next ? chosen.next === name : chosen.current === name
                        let isSelected = name === secondWord


                        let delta = isCurrent ?
                            deltaPromask :
                            distribution
                                .find(({
                                           word,
                                           secondWord
                                       }) => {

                                    if (chosen.next) {
                                        return chosen.next === word && secondWord === name
                                    }
                                    return (chosen.current && word === chosen.current) && secondWord === name
                                })['promaskDelta']

                        delta = Math.round(delta * 100)

                        return <div key={name}
                                    className={
                                        classNames(
                                            "w-full flex items-center relative",
                                            "before:absolute before:left-0 before:right-0 ",
                                            "before:border-b-[1px] before:opacity-20 before:block before:top-1/2 before:transition-all",
                                            "before:w-full",
                                            isCurrent ? 'before:border-b-light' : 'before:border-b-current'
                                        )
                                    }>
                            <ArchiveButton
                                isCurrent={isCurrent}
                                style={{
                                    marginLeft: delta + "%",
                                    backgroundColor: isCurrent ? undefined : mix('EA3C9A', '3514FF', delta)
                                }}
                                className={"transition-[margin] duration-1000 delay-200 rounded-[0px] -translate-x-1/2"}
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