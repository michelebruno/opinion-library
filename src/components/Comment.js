import React from "react";
import classNames from "classnames";

export function HighlightedWord({children, className, isActive, promask, nomask, black}) {
    return <span
        className={classNames(
            'highlighted-word',
            "relative inline-block",
            "transition-colors duration-1000",
            "before:z-[-1] before:absolute",
            "before:transition-all before:duration-1000 before:origin-left",
            "before:h-full before:w-full",
            !promask && !nomask && 'before:bg-light',
            promask && 'before:bg-promask',
            nomask && 'before:bg-nomask',
            !isActive && 'before:scale-x-0',
            className
        )}
    >
        {children}
    </span>
}

export default function Comment({
                                    id,
                                    className,
                                    children,
                                    origin,
                                    petitionLink,
                                    likes,
                                    author,
                                    date,
                                    dateText,
                                    word,
                                    secondWord,
                                    splitted,
                                    petitionTitle,
                                    highlightWords,
                                    large
                                }) {


    if (secondWord && splitted.findIndex(s => s === secondWord) === -1)
        return null;

    return <div
        id={id}
        className={classNames(
            className,
            "comment flex w-full bg-white text-black boreder-2 normal-case",
            large ? 'p-8 rounded-3xl' : 'p-4 rounded-xl text-base ',
            origin === 'promask' && 'border-promask',
            origin === 'nomask' && 'border-nomask'
        )}>
        <div className="w-2/12 ">
            <div className={"mr-[25%] rounded-full bg-" + origin} style={{aspectRatio: '1'}}/>
        </div>
        <div className={"w-10/12"}>
            <div className={"text-[#A2A2A2] " + (large ? 'text-3xl' : 'text-base')}>
                <span>{author}</span>
                {' • '}
                <span>{dateText || date}</span>
            </div>
            <p className={ 'comment-text '+ (large ? 'text-7xl leading-snug py-4' : '')}>
                {typeof splitted !== 'undefined' ? splitted.map((part, i) => {
                    if (part.toLowerCase() === word || part.toLowerCase() === secondWord) return <HighlightedWord
                        key={i} isActive={highlightWords} promask={origin === 'promask'} nomask={origin === 'nomask'}>
                        {part}
                    </HighlightedWord>

                    if (part === secondWord) return <span key={i} className={
                        'border-light border-2'
                    }>{part}</span>

                    return part
                }) : children}
            </p>
            <p className={"text-[#A2A2A2] " + (large ? 'text-2xl' : 'text-base')}>
                <a href={petitionLink} className={"underline"} target={'_blank'}>{petitionTitle}</a>
            </p>
        </div>

    </div>

}


Comment.defaultProps = {
    highlightWords: true
}