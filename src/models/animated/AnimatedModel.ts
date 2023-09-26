import * as twgl from 'twgl.js';

import { GradientModel } from '../gradient/GradientModel';

const vs = `
    attribute vec4 position;

    void main() {
        gl_Position = position;
    }
`;

const fs = `#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}


// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
	return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
	return 0.5 + 0.5*n;
}


void main() {
    vec2 uv = fragCoord / resolution.xy;
    float ratio = resolution.x / resolution.y;

    vec2 tuv = uv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(iTime*.1, tuv.x*tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+75.));
	tuv.y *= ratio;

    
    // Wave warp with sin
    float frequency = 2.;
    float amplitude = 30.;
    float speed = iTime * 4.;
    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
   	tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
    
    
    // draw the image
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    vec3 colorRed = vec3(.914, .345, .62);
    vec3 colorPurple = vec3(.792, .573, .871);
    vec3 colorGreen = vec3(.612, .91, .364);
    vec3 colorBlue = vec3(.42, .773, .937);
    vec3 colorYellow = vec3(1.0, .973, .325);
    
    vec3 layer1 = mix(colorRed, colorYellow, S(-.6, .2, (tuv*Rot(radians(-5.))).x));
    layer1 = mix(layer1, colorWhite, S(-.6, .2, (tuv*Rot(radians(-5.))).x));
    layer1 = mix(layer1, colorPurple, S(-.2, .6, (tuv*Rot(radians(-5.))).x));
    
    vec3 layer2 = mix(colorRed, colorYellow, S(-.8, .2, (tuv*Rot(radians(-5.))).x));
    layer2 = mix(layer2, colorGreen, S(-.1, .9, (tuv*Rot(radians(-5.))).x));
    layer2 = mix(layer2, colorBlue, S(-.5, .5, (tuv*Rot(radians(-5.))).x));
    
    vec3 finalComp = mix(layer1, layer2, S(.7, -.5, tuv.y));
    
    vec3 col = finalComp;
    
    gl_FragColor = vec4(col,1.0);
}
`;

export class AnimatedModel extends GradientModel {
    private animationFrameId: number | null = null;

    /** Renders the animated model to a target context */
    public render(gl: WebGLRenderingContext) {
        const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

        const arrays = {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
        };
        const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

        const frame = (time: DOMHighResTimeStamp) => {
            twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            const uniforms = {
                time: time * 0.001,
                resolution: [gl.canvas.width, gl.canvas.height]
            };

            gl.useProgram(programInfo.program);
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            twgl.setUniforms(programInfo, uniforms);
            twgl.drawBufferInfo(gl, bufferInfo);

            this.animationFrameId = requestAnimationFrame(frame);
        };

        this.animationFrameId = requestAnimationFrame(frame);

        return () => {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }
        };
    }
}
