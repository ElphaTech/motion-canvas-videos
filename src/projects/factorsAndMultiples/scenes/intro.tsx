import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line, Circle, Rect, Text, Shape} from '@motion-canvas/2d/lib/components/'
import { createRef, useDuration, Reference } from '@motion-canvas/core/lib/utils';
import {all, waitUntil, waitFor, sequence} from '@motion-canvas/core/lib/flow';
import { createEaseOutBack, createEaseInOutBack, createEaseInBack } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const textS = {
        fontFamily: 'monospace',
        fill: '#eee',
    };
    // screen
    const screenNode = createRef<Rect>();
    const titleN = createRef<Node>();
    const title0 = createRef<Text>();
    const title1 = createRef<Text>();
    const title2 = createRef<Text>();
    const title3 = createRef<Text>();


    view.add(
        <Rect ref={screenNode} scale={0.2} opacity={0} rotation={10}>
            <Node ref={titleN}>
                <Text text={'Factors &'} {...textS} fontSize={150} lineHeight={150} y={-110.2} ref={title1}/>
                <Text text={'Multiples'} {...textS} fontSize={150} lineHeight={150} y={35.2} ref={title2}/>
                <Text text={'By AlphaTech_'} {...textS} fontSize={75} lineHeight={75} y={160} ref={title3}/>
                {/* <Rect width={1000} height={470} fill={'#2222dd'} opacity={0.5}/> */}
            </Node>
        </Rect>
    );
    function *popR<T extends Shape>(ref: Reference<T>) {
        yield *all(
            ref().opacity(1,0.5),
            ref().rotation(0,0.5),
            ref().scale(1,0.5, createEaseOutBack(1.3))
        )
    }

    yield* waitUntil('start')
    yield* popR(screenNode)
    
    yield* waitUntil('End')
    yield* screenNode().position.x(-1920,1)
});

// To render:
// 1. Open terminal in output folder
// 2. Run this command
// ffmpeg -framerate 60 -pattern_type glob -i 'project/*.png' -c:v libx264 -pix_fmt yuv420p output.mp4