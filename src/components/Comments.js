import React from "react";
import classNames from "classnames";
import Comment from "./Comment";


export default function Comments({comments, chosen, secondWord, onChangeSecondWord, words}) {

    return <div className={"flex h-full"}>
        <div className={"w-3/12"}>

        </div>
        <div
            className={classNames("transition-transform w-9/12 overflow-y-scroll ")}
            id={"comments-container"}>
            <div className="grid grid-cols-2 gap-8 justify-around ">
                {['promask', 'nomask'].map(origin =>
                    <div key={origin} className={"flex flex-col gap-8 pb-64 "}>
                        {comments
                            .map(
                                (c) => <Comment key={c.id}
                                                highlightWords={true}
                                                word={chosen.current}
                                                secondWord={secondWord} {...c} />
                            )}

                    </div>)}
            </div>
        </div>
    </div>
}