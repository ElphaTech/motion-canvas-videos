import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text} from '@motion-canvas/2d/lib/components/'
import { createRef } from '@motion-canvas/core/lib/utils';
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
    // question
    const question = createRef<Node>();
    //numbers
    const tRightNum = createRef<Text>();
    const bRightNum = createRef<Text>();
    // left vinculum
    const lVin = createRef<Line>();
    // right vinculum
    const rVin = createRef<Line>();
    // plus
    const divSymbol = createRef<Node>();
    const plus = createRef<Node>();
    const hDivT = createRef<Line>();
    const vDivT = createRef<Line>();

    // working
    const working = createRef<Node>();
    // nums
    const wTopLeftN = createRef<Text>();
    const wBottomLeftN = createRef<Text>();
    const wTopRightN = createRef<Text>();
    const wBottomRightN = createRef<Text>();
    // nums for working
    const wTopLeftD = createRef<Text>();
    const wBottomLeftD = createRef<Text>();
    const wTopRightD = createRef<Text>();
    const wBottomRightD = createRef<Text>();
    // x for working
    const wTLmult = createRef<Node>();
    const wBLmult = createRef<Node>();
    const wTRmult = createRef<Node>();
    const wBRmult = createRef<Node>();
    // nums for answer
    const wTopLeftA = createRef<Text>();
    const wBottomLeftA = createRef<Text>();
    const wTopRightA = createRef<Text>();
    const wBottomRightA = createRef<Text>();
    // left vinculum
    const wlVin = createRef<Line>();
    // right vinculum
    const wrVin = createRef<Line>();
    //plus
    const wAddSymb = createRef<Node>();

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
                <Text text={'4'} {...textStyle} y={170} x={260} ref={bRightNum}/>

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

                {/* addition sign top*/}
                <Node ref={divSymbol}>
                    <Node ref={plus}>
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
                        />
                    </Node>
                </Node>
            </Node>

            {/* working */}
            <Node ref={working} scale={0.3} y={-400} opacity={0}>
                <Text text={'2'} {...textStyle} y={-130} x={-260} ref={wTopLeftN}/>
                <Text text={'5'} {...textStyle} y={170} x={-260} ref={wBottomLeftN}/>
                <Text text={'3'} {...textStyle} y={-130} x={260} ref={wTopRightN}/>
                <Text text={'4'} {...textStyle} y={170} x={260} ref={wBottomRightN}/>

                <Text text={'4'} {...textStyle} opacity={0} y={-130} x={-260} ref={wTopLeftD}/>
                <Text text={'4'} {...textStyle} opacity={0} y={170} x={-260} ref={wBottomLeftD}/>
                <Text text={'5'} {...textStyle} opacity={0} y={-130} x={780} ref={wTopRightD}/>
                <Text text={'5'} {...textStyle} opacity={0} y={170} x={780} ref={wBottomRightD}/>

                {/* addition sign top*/}
                <Node ref={wTLmult} opacity={0} rotation={45} x={-540} y={100}>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[-65,0],[65,0]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[0,-65],[0,65]]}/>
                </Node>
                <Node ref={wBLmult} opacity={0} rotation={45} x={-540} y={-100}>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[-65,0],[65,0]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[0,-65],[0,65]]}/>
                </Node>
                <Node ref={wTRmult} opacity={0} rotation={45} x={540} y={100}>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[-65,0],[65,0]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[0,-65],[0,65]]}/>
                </Node>
                <Node ref={wBRmult} opacity={0} rotation={45} x={540} y={-100}>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[-65,0],[65,0]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40}
                        lineCap={"round"} points={[[0,-65],[0,65]]}/>
                </Node>

                <Text text={'8'} {...textStyle} opacity={0} y={-130} x={-340} ref={wTopLeftA}/>
                <Text text={'20'} {...textStyle} opacity={0} y={170} x={-340} ref={wBottomLeftA}/>
                <Text text={'15'} {...textStyle} opacity={0} y={-130} x={340} ref={wTopRightA}/>
                <Text text={'20'} {...textStyle} opacity={0} y={170} x={340} ref={wBottomRightA}/>

                {/* Left Vinculum */}
                <Line
                ref={wlVin}
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
                ref={wrVin}
                stroke={"#c92c31"}
                lineWidth={40}
                lineCap={"round"}
                points={[
                    [-80,0],
                    [80,0],
                ]}
                x={260}
                />

                {/* addition sign top*/}
                <Node ref={wAddSymb}>
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
                    />
                </Node>

            </Node>

            {/* answer */}
            <Node ref={answer} x={255} opacity={0}>
                <Node x={20}>
                    <Line stroke={"#c92c31"} lineWidth={40} y={40}
                    lineCap={"round"} points={[[0,0],[130,0]]}/>
                    <Line stroke={"#c92c31"} lineWidth={40} y={-40}
                    lineCap={"round"} points={[[0,0],[130,0]]}/>
                </Node>
                
                <Node x={425}>
                    <Text text={'23'} {...textStyle} y={-130} ref={tAnsNum} opacity={0}/>
                    <Line ref={ansVin} stroke={"#c92c31"} lineWidth={40}
                    lineCap={"round"} points={[[-160,0],[160,0]]}/>
                    <Text text={'20'} {...textStyle} y={170} ref={bAnsNum} opacity={0}/>
                </Node>
            </Node>
        </Node>
    );
    yield* screenNode().position.x(0,1)

    yield* waitUntil('shrink&move q')
    yield* question().scale(0.3,1)
    yield* question().position.y(-400,1)

    yield* waitUntil('working')
    working().opacity(1)
    yield* working().position.y(0,1)
    yield* working().scale(0.8,1)

    yield* waitUntil('lengthen l vin')
    yield* all(
        wlVin().points([[-600,0],[80,0]],1),
        wTopLeftN().position.x(-780,1),
        wBottomLeftN().position.x(-780,1),
    )
    
    yield* waitUntil('Add left nums')
    yield* all(
        wTopLeftD().opacity(1,1),
        wBottomLeftD().opacity(1,1),
        wTLmult().opacity(1,1),
        wBLmult().opacity(1,1),
    )
    
    yield* waitUntil('show left ans')
    yield* all(
        wTopLeftN().opacity(0,1),
        wBottomLeftN().opacity(0,1),
        wTopLeftD().opacity(0,1),
        wBottomLeftD().opacity(0,1),
        wTLmult().opacity(0,1),
        wBLmult().opacity(0,1),
    )
    yield* all(
        wlVin().points([[-240,0],[80,0]],1),
        wTopLeftA().opacity(1,1),
        wBottomLeftA().opacity(1,1),
    )
    
    // right answer
    yield* waitUntil('lengthen r vin')
    yield* all(
        wrVin().points([[-80,0],[600,0]],1),
    )
    
    yield* waitUntil('Add right nums')
    yield* all(
        wTopRightD().opacity(1,1),
        wBottomRightD().opacity(1,1),
        wTRmult().opacity(1,1),
        wBRmult().opacity(1,1),
    )
    
    yield* waitUntil('show right ans')
    yield* all(
        wTopRightN().opacity(0,1),
        wBottomRightN().opacity(0,1),
        wTopRightD().opacity(0,1),
        wBottomRightD().opacity(0,1),
        wTRmult().opacity(0,1),
        wBRmult().opacity(0,1),
    )
    yield* all(
        wrVin().points([[-80,0],[240,0]],1),
        wTopRightA().opacity(1,1),
        wBottomRightA().opacity(1,1),
    )

    yield* waitUntil('work move')
    yield* all(
        working().scale(1,1),
        question().position.y(-1500,1),
    )
    yield* working().position.x(-340,1)

    yield* waitUntil('a show')
    yield* answer().opacity(1,1)

    yield* waitUntil('numr show')
    yield* tAnsNum().opacity(1,1)

    yield* waitUntil('dnom show')
    yield* bAnsNum().opacity(1,1)

    yield* waitUntil('End');
    yield* screenNode().position.x(-1920,1)
});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'project/*.png' -c:v libx264 -pix_fmt yuv420p output.mp4