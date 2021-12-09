import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";


export default function Comment({
                                    children,
                                    origin,
                                    extracted,
                                    petitionLink,
                                    likes,
                                    author,
                                    date,
                                    word,
                                    secondWord,
                                    splitted,
                                }) {


    if (secondWord && splitted.findIndex(s => s === secondWord) === -1)
        return null;

    return <div
        className={classNames("flex p-4 w-full bg-white text-black boreder-2 rounded-xl", origin === 'promask' && 'border-promask', origin === 'nomask' && 'border-nomask')}>
        <div className="w-2/12 px-3">
            <div className={"rounded-full bg-" + origin} style={{aspectRatio: '1'}}/>
        </div>
        <div className={"w-10/12"}>
            <div>
                <span>{author}</span>
            </div>
            <p>
                {splitted.map((part, i) => {
                    if (part.toLowerCase() === word || part.toLowerCase() === secondWord) return <span key={i} className={
                        classNames(
                            origin === 'promask' && 'bg-promask text-white',
                            origin === 'nomask' && 'bg-nomask text-white'
                        )
                    }>{part}</span>

                    if (part === secondWord) return <span key={i} className={
                        'border-light border-2'
                    }>{part}</span>

                    return part
                })}
            </p>
            <p className="text-sm text-gray-500 flex gap-4">
                <span>{likes} likes</span>
                <a href={petitionLink} target={'_blank'}>Petition</a>
            </p>
        </div>

    </div>

}