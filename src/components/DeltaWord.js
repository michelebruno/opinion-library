import React from "react";


export default function DeltaWord({children, className, style, id, promask, top, left, right, bottom, rotate}) {
    const promaskPercentage = promask.toFixed(0) + "%"
    const nomaskPercentage = (100 - promask).toFixed(0) + "%"

    return <div className="delta-word group absolute inline-block" style={{
        top: typeof top !== 'undefined' ? top + "%" : undefined,
        bottom: typeof bottom !== 'undefined' ? bottom + "%" : undefined,
        left: typeof left !== 'undefined' ? left + "%" : undefined,
        right: typeof right !== 'undefined' ? right + "%" : undefined,
        transform: typeof rotate !== 'undefined' ? "rotate(" + rotate + "deg)" : undefined,
    }}>
        <div className="relative">
            <div className="text-3xl align-middle ">
                <div
                    className=" cursor-pointer absolute left-0 top-0 h-full transition-all text-center bg-promask flex items-center justify-center"
                    style={{width: promaskPercentage}}>
                    <span className="opacity-0 group-hover:opacity-100 transition-all">{promaskPercentage}</span>
                </div>
                <div
                    className="cursor-pointer absolute right-0 top-0 h-full transition-all text-center bg-nomask flex items-center justify-center"
                    style={{width: nomaskPercentage}}>
                    <span className="opacity-0 group-hover:opacity-100 transition-all">{nomaskPercentage}</span>
                </div>
            </div>
            <span className="group-hover:opacity-0 transition-all relative px-1 cursor-pointer">{children}</span>

        </div>
    </div>
}