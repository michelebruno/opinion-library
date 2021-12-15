import React from "react";
import classNames from "classnames";
import Comment from "./Comment";
import Button, {ArchiveButton} from "./Button";
import {mix} from "../utils/mix";


export default function Comments({comments, chosen, secondWord, onChangeSecondWord, distribution}) {

    return <div className={"flex h-full px-8 flex-wrap "}>
        <p className="mb-3 w-full">Comments containing the
            word <span className={"underline"}>{chosen}</span>{secondWord && <>{" and "}<span className={"underline"}>{secondWord}</span></>}</p>
                <div className="flex h-full w-full overflow-y-scroll">
                <div className={"w-[25%] sticky top-0"}>
                <h3 className={"uppercase mb-3"}>Filter comments by:</h3>
            {distribution.map(({secondWord: word, promaskDelta}) => {
                const isSelected = secondWord === word
                const isCurrent = chosen === word

                if (isCurrent)
                return null;

                return <ArchiveButton
                key={word}
                className={"mb-2"}
                isSelected={isSelected}
                onClick={() => onChangeSecondWord(isSelected ? undefined : word)}
                style={{
                '--gradient-mix': mix('EA3C9A', '3514FF', promaskDelta*100)
            }}
                >
            {word}
                </ArchiveButton>
            })}
                </div>
                <div
                className={classNames("transition-transform w-[60%]")}
                id={"comments-container"}>
                <div className="grid grid-cols-2 gap-8 justify-around ">
            {['promask', 'nomask'].map(origin => {
                const filteredComments = comments
                .filter(({origin: o}) => origin === o)

                return <div key={origin} className={"flex flex-col gap-3 pb-64 "}>
                <p className="sticky top-0 bg-black z-30 text-center">{filteredComments.length} {origin} comments</p>
            {filteredComments
                .map(
                (c) => <Comment key={c.id}
                highlightWords={true}
                word={chosen.current}
                secondWord={secondWord} {...c} />
                )}

                </div>
            })}
                </div>
                </div>
                </div>
                </div>
            }