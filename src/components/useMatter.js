import {useEffect} from "react";
import * as Matter from "matter-js";
import {graphql, useStaticQuery} from "gatsby";

const {Engine, Render, World, Bodies} = Matter


export default function useMatter(containerRef) {

    const {front} = useStaticQuery(graphql`{
        front: allFile(filter: {relativeDirectory: {eq: "landing"}}) {
            nodes {
                publicURL
            }
        }
    }`)

    useEffect(() => {

        function random() {
            if (Math.random() < 0.5) {
                return -1 * Math.random()
            } else {
                return Math.random()
            }
        }

        const engine = Engine.create();

        const render = Render.create({
            element: containerRef.current?.querySelector('.snapper'),
            engine: engine,
            options: {
                background: '#CFFF58',
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                hasBounds: true
            }
        });

        render.context.globalAlpha = 0;

        //Settings
        const gravity = 0;
        const sizeX = window.innerWidth;
        const sizeY = window.innerHeight;
        const friction = 0.0001;
        const angularVelocity = 0.3;
        const maskSize = 100;
        const spriteScale = 1.3; // il bounding box è definito da maskSize

        const masks = []

        for (let i = 0; i < 4; i++) {

            masks.push(Bodies.circle(Math.random() * sizeX, Math.random() * sizeY, maskSize, {
                friction: 0,
                frictionStatic: 0,
                frictionAir: friction,
                angularVelocity: angularVelocity, // = quanto rimbalzano
                restitution: 1,
                force: {x: random() / 2, y: random() / 2},
                render: {
                    sprite: {
                        texture: front.nodes[i].publicURL,
                        xScale: spriteScale,
                        yScale: spriteScale
                    }
                }
            }))
        }


        const textBox = Bodies.rectangle(sizeX / 2, sizeY / 2, sizeX * 0.7, sizeY * 0.2, {
            isStatic: true,
            render: {visible: false}
        })

        const scrollDownBox = Bodies.rectangle(
            sizeX / 2,
            sizeY,
            sizeX / 4,
            sizeY / 7,
            {
                isStatic: true,
                render: {
                    visible: false
                }
            }
        )

        //Add walls
        const wall_down = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 6, window.innerWidth, 10, {isStatic: true});
        const wall_top = Bodies.rectangle(window.innerWidth / 2, -6, window.innerWidth, 10, {isStatic: true});
        const wall_left = Bodies.rectangle(-6, window.innerHeight / 2, 10, window.innerHeight, {isStatic: true});
        const wall_right = Bodies.rectangle(window.innerWidth + 6, window.innerHeight / 2, 10, window.innerHeight, {isStatic: true});

        //Add Mouse
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {visible: false}
            }
        });

        render.mouse = mouse;

        //Set Gravity (done trough //Settings)
        engine.world.gravity.y = gravity;
        engine.world.gravity.x = gravity;

        World.add(engine.world, [...masks, wall_top, wall_down, wall_left, wall_right, textBox, scrollDownBox, mouseConstraint]);

        Matter.Runner.run(engine);
        Render.run(render);

    },)


}