import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Text, Rect } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { tween } from "@motion-canvas/core/lib/tweening";
import { waitUntil } from "@motion-canvas/core/lib/flow";
import { cancel } from "@motion-canvas/core/lib/threading";


function tick(divisions: number, time: number): number {
    
    return Math.floor(time * divisions) * (360 / divisions);
}

export default makeScene2D(function* (view) {
    const circleref = createRef<Circle>();
    const textref = createRef<Text>();
    const secondsRef = createRef<Rect>();

    view.add(
        <>
            <Text
                ref={textref}
                fontSize={120}
                lineHeight={120}
                fill={"rgba(255, 255, 255, 0.8)"}
                x={0}
                y={-350}
                text={"Modulo"}
            />
            <Circle
                ref={circleref}
                x={0}
                width={400}
                height={400}
                fill="#fff"
            />
            <Rect
                ref={secondsRef}
                x={0}
                y={0}
                width={10}
                height={190}
                offset={[0, 1]}
                fill="#000"
                radius={5}
            />
        </>
    );
    const seconds = tween(Infinity, (_, time) => {
        secondsRef().rotation(tick(60, time / 10));
    });
    yield seconds;
    yield* waitUntil("twelve");
    cancel(seconds);
    const hours = tween(Infinity, (_, time) => {
        secondsRef().rotation(tick(12, time / 10));
    });
    yield hours;
    yield* waitUntil("done");
    cancel(hours);
});