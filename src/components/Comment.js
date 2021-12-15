import React from "react";
import classNames from "classnames";

export function HighlightedWord({children, className, isActive, promask, nomask, black}) {
    return <span
        className={classNames(
            'highlighted-word',
            "relative inline-block z-[0]",
            "transition-colors duration-1000",
            "before:z-[-1] before:absolute",
            "before:transition-all before:duration-1000 before:origin-left",
            "before:h-full before:w-full",
            !promask && !nomask && 'before:bg-light',
            promask && 'before:bg-promask',
            nomask && 'before:bg-nomask',
            isActive && (nomask || promask) && 'text-white',
            !isActive && 'before:scale-x-0 text-white',
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
                                    createdAt,
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
            "comment flex gap-4 w-full bg-white text-black boreder-2 normal-case",
            large ? 'p-8 rounded-3xl' : 'p-4 rounded-xl text-base ',
            origin === 'promask' && 'border-promask',
            origin === 'nomask' && 'border-nomask'
        )}>
        <div className="w-1/12 ">
            <div className={"rounded-full bg-" + origin} style={{aspectRatio: '1'}}/>
        </div>
        <div className={"w-11/12"}>
            <div className={"text-gray " + (large ? 'text-3xl' : 'text-sm')}>
                <span>{author}</span>
                {' • '}
                <span>{dateText || createdAt}</span>
            </div>
            <p className={'comment-text ' + (large ? 'text-7xl leading-snug py-4' : 'py-1 text-base')}>
                {typeof splitted !== 'undefined' ? splitted.map((part, i) => {
                    if (part.toLowerCase() === word || part.toLowerCase() === secondWord) return <React.Fragment key={i}>{" "}
                        <HighlightedWord
                            isActive={highlightWords} promask={origin === 'promask'}
                            nomask={origin === 'nomask'}>
                            {part}
                        </HighlightedWord>
                    </React.Fragment>

                    if (part === secondWord) return <span key={i} className={
                        'border-light border-2'
                    }>{part}</span>

                    return part
                }) : children}
            </p>
            <p className={"text-gray " + (large ? 'text-2xl' : 'text-sm')}>
                <a href={petitionLink} className={"underline"} target={'_blank'}>{petitionTitle || "Petition title"}</a>
            </p>
        </div>

    </div>

}


Comment.defaultProps = {
    highlightWords: true
}