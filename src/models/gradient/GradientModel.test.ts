import { GradientModel, LinearGradientModel } from './GradientModel';
import { ColorModel } from '../color/ColorModel';

describe('GradientModel', () => {
    it('should create a gradient model with color models', () => {
        const color1 = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
        const color2 = new ColorModel({ hue: 120, chroma: 50, luminance: 50 });
        const gradient = new GradientModel([color1, color2]);
        expect(gradient.stops.length).toBe(2);
        expect(gradient.stops[0].color).toBe(color1);
        expect(gradient.stops[0].location).toBe(0);
        expect(gradient.stops[1].color).toBe(color2);
        expect(gradient.stops[1].location).toBe(1);
    });

    it('should create a gradient model with gradient stops', () => {
        const step1 = { color: new ColorModel({ hue: 0, chroma: 50, luminance: 50 }), location: 0 };
        const step2 = { color: new ColorModel({ hue: 120, chroma: 50, luminance: 50 }), location: 1 };
        const gradient = new GradientModel([step1, step2]);
        expect(gradient.stops.length).toBe(2);
        expect(gradient.stops[0]).toBe(step1);
        expect(gradient.stops[1]).toBe(step2);
    });

    it('should sort gradient stops by location', () => {
        const step1 = { color: new ColorModel({ hue: 0, chroma: 50, luminance: 50 }), location: 1 };
        const step2 = { color: new ColorModel({ hue: 120, chroma: 50, luminance: 50 }), location: 0 };
        const gradient = new GradientModel([step1, step2]);
        expect(gradient.stops.length).toBe(2);
        expect(gradient.stops[0]).toBe(step2);
        expect(gradient.stops[1]).toBe(step1);
    });

    describe('fromComplementary', () => {
        it('should create a gradient model with complementary colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromComplementary(color);
            expect(gradient.stops.length).toBe(2);
            expect(gradient.stops[0].color).toBe(color);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toEqual(ColorModel.complementary(color));
            expect(gradient.stops[1].location).toBe(1);
        });
    });

    describe('fromTriad', () => {
        it('should create a gradient model with triad colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromTriad(color);
            expect(gradient.stops.length).toBe(3);
            expect(gradient.stops[0].color).toStrictEqual(color);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toEqual(ColorModel.triad(color)[1]);
            expect(gradient.stops[1].location).toBe(0.5);
            expect(gradient.stops[2].color).toEqual(ColorModel.triad(color)[2]);
            expect(gradient.stops[2].location).toBe(1);
        });
    });

    describe('fromAnalogous', () => {
        it('should create a gradient model with analogous colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromAnalogous(color);
            expect(gradient.stops.length).toBe(3);
            expect(gradient.stops[0].color).toEqual(ColorModel.analogous(color)[0]);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toStrictEqual(color);
            expect(gradient.stops[1].location).toBe(0.5);
            expect(gradient.stops[2].color).toEqual(ColorModel.analogous(color)[2]);
            expect(gradient.stops[2].location).toBe(1);
        });
    });

    describe('fromSplitComplementary', () => {
        it('should create a gradient model with split complementary colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromSplitComplementary(color);
            expect(gradient.stops.length).toBe(3);
            expect(gradient.stops[0].color).toStrictEqual(color);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toEqual(ColorModel.splitComplementary(color)[1]);
            expect(gradient.stops[1].location).toBe(0.5);
            expect(gradient.stops[2].color).toEqual(ColorModel.splitComplementary(color)[2]);
            expect(gradient.stops[2].location).toBe(1);
        });
    });

    describe('fromTetradic', () => {
        it('should create a gradient model with tetradic colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromTetradic(color);
            expect(gradient.stops.length).toBe(4);
            expect(gradient.stops[0].color).toStrictEqual(color);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toEqual(ColorModel.tetradic(color)[1]);
            expect(gradient.stops[1].location).toBeCloseTo(0.333);
            expect(gradient.stops[2].color).toEqual(ColorModel.tetradic(color)[2]);
            expect(gradient.stops[2].location).toBeCloseTo(0.666);
            expect(gradient.stops[3].color).toEqual(ColorModel.tetradic(color)[3]);
            expect(gradient.stops[3].location).toBe(1);
        });
    });

    describe('fromSquare', () => {
        it('should create a gradient model with square colors', () => {
            const color = new ColorModel({ hue: 0, chroma: 50, luminance: 50 });
            const gradient = new GradientModel([]).fromSquare(color);
            expect(gradient.stops.length).toBe(4);
            expect(gradient.stops[0].color).toStrictEqual(color);
            expect(gradient.stops[0].location).toBe(0);
            expect(gradient.stops[1].color).toEqual(ColorModel.square(color)[1]);
            expect(gradient.stops[1].location).toBeCloseTo(0.333);
            expect(gradient.stops[2].color).toEqual(ColorModel.square(color)[2]);
            expect(gradient.stops[2].location).toBeCloseTo(0.666);
            expect(gradient.stops[3].color).toEqual(ColorModel.square(color)[3]);
            expect(gradient.stops[3].location).toBe(1);
        });
    });

    it('should format the gradient using the provided formatter', () => {
        const gradient = new LinearGradientModel(15, { x: 0, y: 0 }, { x: 500, y: 0 }, []).fromAnalogous(
            new ColorModel({ hue: 0, chroma: 100, luminance: 100 })
        );

        expect(gradient.css()).toEqual(
            'linear-gradient(15deg, lch(100% 100 330 / 1) 0%, lch(100% 100 0 / 1) 50%, lch(100% 100 30 / 1) 100%);'
        );
    });
});
