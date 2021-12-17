import React from "react";
import classNames from "classnames";
import Comment from "./Comment";
import Button, {ArchiveButton} from "./Button";
import {mix} from "../utils/mix";
import {sentencesHaveWord} from "../utils/sentences";


export default function Comments({comments, chosen, secondWord, onChangeSecondWord, distribution}) {

    return <div className={"flex h-full px-8 flex-wrap "}>
        <p className="mb-4 w-full text-lg">Here you can read the comments on the 100 most liked promask and nomask
            petition</p>
        <div className={"w-full sticky top-0"}>
            <h2 className={"uppercase mb-4"}>Filter comments by:</h2>
            <div className="flex flex-wrap gap-x-2">
                {distribution.map(({secondWord: word, nomaskDelta}) => {
                    const isSelected = secondWord === word
                    const isCurrent = chosen === word


                    return <ArchiveButton
                        key={word}
                        checkbox
                        isCurrent={isCurrent}
                        className={"mb-2"}
                        isSelected={isSelected}
                        onClick={() => onChangeSecondWord(isSelected ? undefined : word)}
                        style={{
                            '--gradient-mix': mix('EA3C9A', '3514FF', nomaskDelta * 100)
                        }}
                    >
                        {word}
                    </ArchiveButton>
                })}
            </div>
        </div>
        <div className="flex h-full w-full overflow-y-scroll">

            <div
                className={classNames("transition-transform w-3/4 mx-auto")}
                id={"comments-container"}>
                <div className="grid grid-cols-2 gap-16 justify-around ">
                    {['promask', 'nomask'].map(origin => {
                        let filteredComments = comments
                            .filter(({origin: o}) => origin === o)

                        let totalComments = filteredComments.length

                        if (secondWord) {
                            filteredComments = filteredComments
                                .filter(({sentences}) => {
                                    return sentencesHaveWord(sentences, secondWord)
                                })
                        }


                        return <div>
                            <p className="sticky top-0 bg-black z-30 text-center text-lg pt-3 pb-4">
                                {filteredComments.length}{secondWord && " of " + totalComments} {origin} comments
                            </p>

                            <div key={origin} className={"flex flex-col gap-4 pb-64 "}> {filteredComments
                                .map(
                                    (c) => <Comment key={c.id}
                                                    highlightWords={true}
                                                    word={chosen}
                                                    secondWord={secondWord} {...c} />
                                )}

                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}