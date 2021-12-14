import React from "react";
import classNames from "classnames";
import Comment from "./Comment";


export default function Comments({comments, words}) {

    return <div className={"flex"}>
        <div>

        </div>
        <div
            className={classNames("absolute transition-transform top-0 bottom-0 right-0 w-9/12 ")}
            id={"comments-container"}>
            <div className="grid grid-cols-2 gap-8 justify-around">
                {['promask', 'nomask'].map(origin =>
                    <div className={"flex flex-col gap-8 pb-64 "}>
                        {comments
                            .filter(({origin: o}) => origin === o)
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