import React from "react";


import {useEffect, useRef} from 'react'
import Matter, {Engine, Render, Bodies, World,} from 'matter-js'
import 'matter-dom-plugin'
import Layout from "../components/Layout";

function Comp(props) {
    const scene = useRef()
    const engine = useRef(Engine.create())
    useEffect(() => {

        Matter.use('matter-dom-plugin')

        // mount
        const cw = document.body.clientWidth
        const ch = document.body.clientHeight

        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: 'transparent'
            }
        })

        // unmount
        return () => {
            // destroy Matter
            Render.stop(render)
            World.clear(engine.current.world)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }, [])

    return <Layout>
        <div ref={scene} className={"w-screen h-screen"} />
    </Layout>

}

export default Comp