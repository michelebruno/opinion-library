import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Comment from "./Comment";

function Header({children, className}) {
    return <div className={"px-8 py-2 text-xl uppercase border-white border-[1px] " + className}>
        {children}
    </div>
}


export function MaskometerGrid({chosen, words, distribution, comments}) {
    const [collapse, setCollapse] = useState(false)

    const [secondWord, setSecondWord] = useState()

    useEffect(() => {
        if (collapse) {
            setSecondWord()
        }
    }, [collapse])

    return <div className="col-span-9 min-h-0 flex flex-col justify-between relative gap-4 ">
        <div className="flex-1">
            <div
                className={classNames("h-full flex flex-col justify-between relative", collapse ? 'overflow-y-scroll' : 'overflow-hidden')}>
                <div className={"uppercase"}>
                    <p className="bg-promask text-white text-lg text-center h-full absolute top-0 bottom-0 left-0"
                       style={{'writing-mode': 'vertical-lr'}}>
                        Promask
                    </p>

                    <p className="bg-nomask text-white text-lg text-center h-full absolute top-0 bottom-0 right-0"
                       style={{'writing-mode': 'vertical-rl'}}>
                        Nomask
                    </p>


                    {(typeof chosen !== 'undefined' && chosen.current) ?
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
                                            "inline-block px-1 text-lg border-[1px] uppercase text-center",
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
                        }) : <div className="p-20 text-7xl w-3/4 opacity-50 upppercase">
                            click on one of the most used words to see how the related words are used by the two groups
                            in the comments
                        </div>
                    }
                </div>

            </div>

        </div>
    </div>
}