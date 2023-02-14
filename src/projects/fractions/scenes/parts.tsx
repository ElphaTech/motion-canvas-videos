import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text} from '@motion-canvas/2d/lib/components/'
import { createRef } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const textStyle = {
        fontSize: 100,
        fontFamily: 'JetBrains Mono',
        fill: '#ffffff',
        lineHeight: 270
    };
    // screen
    const screenNode = createRef<Node>();
    // question
    const question = createRef<Rect>();

    view.add(
        <Node ref={screenNode} x={1920}>
            <Rect layout gap={200} alignItems={'center'}>
                <Rect direction={'column'} gap={20}>
                <Rect justifyContent={'center'}>
                    <Text text={'2'} {...textStyle}/>
                </Rect>
                {/* Left Vinculum */}
                <Line
                stroke={"#c92c31"}
                lineWidth={40}
                lineCap={"round"}
                points={[
                    [-80,0],
                    [80,0],
                ]}
                />
                <Rect justifyContent={'center'}>
                    <Text text={'5'} {...textStyle}/>
                </Rect>
                </Rect>
                <Rect direction={'column'} gap={40}>
                <Rect justifyContent={'center'}>
                    <Text text={'Numerator'} {...textStyle} y={-130}/>
                </Rect>
                <Rect justifyContent={'center'}>
                    <Text text={'Denominator'} {...textStyle} y={170}/>
                </Rect>
                </Rect>
            </Rect>
        </Node>
    );
    yield* screenNode().position.x(0,1)

    yield* waitUntil('End')
    yield* screenNode().position.x(-1920,1)
});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'output/project/*.png' -i audio/voice.mp3 -shortest -c:v libx264 -pix_fmt yuv420p output/output.mp4