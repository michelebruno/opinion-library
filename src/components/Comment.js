import React from "react";
import classNames from "classnames";


export default function Comment({children, author, date, promask, nomask, petition}) {

    return <div className={classNames("flex p-4 w-full bg-white text-black boreder-2", promask && 'border-promask', nomask && 'border-nomask')}>
        <div className="w-2/12">
            t
        </div>

        <div className={"w-10/12"}>
            <div>
                <span>{author}</span>
            </div>
            <p>{children}</p>
        </div>

    </div>

}