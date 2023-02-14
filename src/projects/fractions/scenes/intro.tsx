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


    view.add(
        <Node ref={screenNode}>
            <Node y={-300}>
                <Text text={'Fractions'} {...textStyle} fill={'#3d9be2'} fontSize={200} lineHeight={180} y={-50} ref={bRightNum}/>
                <Text text={'With AlphaTech_'} {...textStyle} fill={'#2db1e5'} fontSize={80} lineHeight={72} y={100} ref={bRightNum}/>
            </Node>
            <Node ref={question} scale={0.7} y={180}>
                <Text text={'S'} {...textStyle} y={-130} x={-260}/>
                <Text text={'B'} {...textStyle} y={170} x={-260}/>
                <Text text={'U'} {...textStyle} y={-130} x={260} ref={tRightNum}/>
                <Text text={'?'} {...textStyle} y={170} x={260} ref={bRightNum}/>

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
                        y={65}
                        />,
                    </Node>
                </Node>
            </Node>
        </Node>
    );

    yield* waitUntil('start') 

    yield* waitUntil('Subtraction')
    yield* all(
        crossT().rotation(180,0.5),
        crossB().rotation(180,0.5),
        vDivT().opacity(0,0.5),
        vDivB().opacity(0,0.5),
    )

    yield* waitUntil('Multiplication')
    yield* all(
        crossT().rotation(-45,0.5),
        crossB().rotation(-45,0.5),
        vDivT().opacity(1,0.5),
        vDivB().opacity(1,0.5),
    )

    yield* waitUntil('Division')
    yield* all(
        crossT().rotation(180,0.5),
        crossB().rotation(180,0.5),
        vDivT().end(0,0.5),
        vDivB().end(0,0.5),
        vDivT().opacity(1,0.5),
        vDivB().opacity(1,0.5),
    )
    
    yield* waitUntil('End');
    yield* screenNode().position.x(-1920,1)
});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'project/*.png' -c:v libx264 -pix_fmt yuv420p output.mp4