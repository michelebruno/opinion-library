import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";


export default function Comment({children, extracted, petitionLink, likes, author, date, word, promask, nomask, petition}) {

    return <div
        className={classNames("flex p-4 w-full bg-white text-black boreder-2 rounded-xl", promask && 'border-promask', nomask && 'border-nomask')}>
        <div className="w-2/12 px-3">
            <div className="rounded-full bg-promask" style={{aspectRatio: '1'}}/>
        </div>
        <div className={"w-10/12"}>
            <div>
                <span>{author}</span>
            </div>
            <p><Highlighter textToHighlight={extracted}
                            highlightClassName="bg-promask text-white"
                            searchWords={[word]}/></p>
            <p className="text-sm text-gray-500 flex gap-4">
                <span>{likes} likes</span>
                <a href={petitionLink} target={'_blank'}>Petition</a>
            </p>
        </div>

    </div>

}