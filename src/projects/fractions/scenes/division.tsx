import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text} from '@motion-canvas/2d/lib/components/'
import { createRef, useDuration } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const textStyle = {
        fontSize: 300,
        fontFamily: 'JetBrains Mono',
        fill: '#ffffff',
        lineHeight: 270
    };
    // screen
    const screenNode = createRef<Node>();
    //numbers
    const tRightNum = createRef<Text>();
    const bRightNum = createRef<Text>();
    // left vinculum
    const lVin = createRef<Line>();
    // right vinculum
    const rVin = createRef<Line>();
    // cross/div sign
    const divSymbol = createRef<Node>();
    const crossT = createRef<Node>();
    const crossB = createRef<Node>();
    const hDivT = createRef<Line>();
    const hDivB = createRef<Line>();
    const vDivT = createRef<Line>();
    const vDivB = createRef<Line>();
    // question
    const question = createRef<Node>();
    // answer
    const answer = createRef<Node>();
    const tAnsNum = createRef<Text>();
    const ansVin = createRef<Line>();
    const bAnsNum = createRef<Text>();


    view.add(
        <Node ref={screenNode} x={1920}>
            <Node ref={question}>
                <Text text={'2'} {...textStyle} y={-130} x={-260}/>
                <Text text={'5'} {...textStyle} y={170} x={-260}/>
                <Text text={'3'} {...textStyle} y={-130} x={260} ref={tRightNum}/>
                <Text text={'5'} {...textStyle} y={170} x={260} ref={bRightNum}/>

                {/* Left Vinculum */}
                <Line
                ref={lVin}
                stroke={"#c92c31"}
                lineWidth={40}
                lineCap={"round"}
                points={[
                    [-80,0],
                    [80,0],
                ]}
                x={-260}
                />

                {/* Right Vinculum */}
                <Line
                ref={rVin}
                stroke={"#c92c31"}
                lineWidth={40}
                lineCap={"round"}
                points={[
                    [-80,0],
                    [80,0],
                ]}
                x={260}
                />

                {/* division sign top*/}
                <Node ref={divSymbol}>
                    <Node ref={crossT}>
                        <Line
                        ref={hDivT}
                        stroke={"#c92c31"}
                        lineWidth={40}
                        lineCap={"round"}
                        points={[
                            [-65,0],
                            [65,0],
                        ]}
                        />,
                        <Line
                        ref={vDivT}
                        stroke={"#c92c31"}
                        lineWidth={40}
                        lineCap={"round"}
                        points={[
                            [0,0],
                            [0,130],
                        ]}
                        end={0}
                        y={-65}
                        />,
                    </Node>

                    {/* division sign bottom */}
                    <Node ref={crossB}>
                        <Line
                        ref={hDivB}
                        stroke={"#c92c31"}
                        lineWidth={40}
                        lineCap={"round"}
                        points={[
                            [-65,0],
                            [65,0],
                        ]}
                        />,
                        <Line
                        ref={vDivB}
                        stroke={"#c92c31"}
                        lineWidth={40}
                        lineCap={"round"}
                        points={[
                            [0,0],
                            [0,-130]
                        ]}
                        end={0}
                        y={65}
                        />,
                    </Node>
                </Node>
            </Node>

            {/* answer */}
            <Node ref={answer} x={543.75} opacity={0}>
                <Node x={-260}>
                    <Line stroke={"#c92c31"} lineWidth={40}
                    lineCap={"round"} points={[[-65,40],[65,40]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40}
                    lineCap={"round"} points={[[-65,-40],[65,-40]]}/>
                </Node>

                <Text text={'2'} {...textStyle} y={-130} ref={tAnsNum} opacity={0}/>
                <Line
                ref={ansVin}
                stroke={"#c92c31"}
                lineWidth={40}
                lineCap={"round"}
                points={[
                    [-80,0],
                    [80,0],
                ]}
                />
                <Text text={'3'} {...textStyle} y={170} ref={bAnsNum} opacity={0}/>
            </Node>
        </Node>
    );
    yield* screenNode().position.x(0,1)

    yield* waitUntil('bounce')
    yield* divSymbol().position.y(-50,0.5,createEaseOutBack(1))
    yield* divSymbol().position.y(0,0.1,createEaseInBack(1))

    yield* waitUntil('cross')
    yield* all(
        vDivT().end(1,0.5),
        vDivB().end(1,0.5),
    ),

    yield* waitUntil('rotate')
    yield* all(
        crossT().rotation(45,0.5),
        crossB().rotation(45,0.5),
    )

    yield* waitUntil('split')
    yield* all(
        crossT().position.y(100,1),
        crossB().position.y(-100,1),
    )
    
    yield* waitUntil('join')
    yield* all(
        lVin().points([[-80,0],[260,0]],1),
        rVin().points([[-260,0],[80,0]],1),
    )

    yield* waitUntil('swap')
    yield* all(
        tRightNum().position.y(170,1),
        bRightNum().position.y(-130,1),
    )

    yield* waitUntil('q move')
    yield* question().position.x(-283.75,1)

    yield* waitUntil('a show')
    yield* answer().opacity(1,1)

    yield* waitUntil('numr show')
    yield* tAnsNum().opacity(1,1)

    yield* waitUntil('dnom show')
    yield* bAnsNum().opacity(1,1)

    yield* waitUntil('End')
    yield* screenNode().position.x(-1920,1)

    yield* waitUntil('Blank')
});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'project/*.png' -c:v libx264 -pix_fmt yuv420p output.mp4