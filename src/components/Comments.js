import React, {useMemo} from "react";
import classNames from "classnames";
import Comment from "./Comment";
import {ArchiveButton} from "./Button";
import {mix} from "../utils/mix";
import {sentencesHaveWord} from "../utils/sentences";


function GroupCommentList({comments, chosen, secondWord, origin}) {


    const {filteredComments, totalComments} = useMemo(() => {
        let thisOriginComments = comments
            .filter(({origin: o}) => origin === o)


        return {
            totalComments: thisOriginComments.length,
            filteredComments: thisOriginComments
                .filter(({sentences}) => {
                    return !secondWord || sentencesHaveWord(sentences, secondWord)
                })
        }
    }, [secondWord, origin, chosen])


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
}

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
                className={classNames("transition-transform w-10/12 mx-auto")}
                id={"comments-container"}>
                <div className="grid grid-cols-2 gap-16 justify-around ">
                    {['promask', 'nomask'].map(origin => <GroupCommentList key={origin} origin={origin}
                                                                           comments={comments}
                                                                           chosen={chosen} secondWord={secondWord}/>)}
                </div>
            </div>
        </div>
    </div>
}