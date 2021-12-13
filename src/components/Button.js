import React from "react";


export default function Button({children, as:As , ...props}) {
    return  <As className={"rounded-2xl border-[1px] py-2 px-4 text-lg hover:border-light hover:text-light active:bg-light active:text-black"}
                  activeClassName={"border-light text-light"} {...props}>{children}</As>

}