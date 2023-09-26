import { GradientModel } from './GradientModel';
import { ColorModel } from '../color/ColorModel';

describe('GradientModel', () => {
    it('should create a gradient model with color models', () => {
        const color1 = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const color2 = new ColorModel({ hue: 120, saturation: 50, lightness: 50 });
        const gradient = new GradientModel([color1, color2]);
        expect(gradient.steps.length).toBe(2);
        expect(gradient.steps[0].color).toBe(color1);
        expect(gradient.steps[0].location).toBe(0);
        expect(gradient.steps[1].color).toBe(color2);
        expect(gradient.steps[1].location).toBe(1);
    });

    it('should create a gradient model with gradient steps', () => {
        const step1 = { color: new ColorModel({ hue: 0, saturation: 50, lightness: 50 }), location: 0 };
        const step2 = { color: new ColorModel({ hue: 120, saturation: 50, lightness: 50 }), location: 1 };
        const gradient = new GradientModel([step1, step2]);
        expect(gradient.steps.length).toBe(2);
        expect(gradient.steps[0]).toBe(step1);
        expect(gradient.steps[1]).toBe(step2);
    });

    it('should sort gradient steps by location', () => {
        const step1 = { color: new ColorModel({ hue: 0, saturation: 50, lightness: 50 }), location: 1 };
        const step2 = { color: new ColorModel({ hue: 120, saturation: 50, lightness: 50 }), location: 0 };
        const gradient = new GradientModel([step1, step2]);
        expect(gradient.steps.length).toBe(2);
        expect(gradient.steps[0]).toBe(step2);
        expect(gradient.steps[1]).toBe(step1);
    });

    describe('fromComplementary', () => {
        it('should create a gradient model with complementary colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromComplementary(color);
            expect(gradient.steps.length).toBe(2);
            expect(gradient.steps[0].color).toBe(color);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toEqual(ColorModel.complementary(color));
            expect(gradient.steps[1].location).toBe(1);
        });
    });

    describe('fromTriad', () => {
        it('should create a gradient model with triad colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromTriad(color);
            expect(gradient.steps.length).toBe(3);
            expect(gradient.steps[0].color).toStrictEqual(color);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toEqual(ColorModel.triad(color)[1]);
            expect(gradient.steps[1].location).toBe(0.5);
            expect(gradient.steps[2].color).toEqual(ColorModel.triad(color)[2]);
            expect(gradient.steps[2].location).toBe(1);
        });
    });

    describe('fromAnalogous', () => {
        it('should create a gradient model with analogous colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromAnalogous(color);
            expect(gradient.steps.length).toBe(3);
            expect(gradient.steps[0].color).toEqual(ColorModel.analogous(color)[0]);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toStrictEqual(color);
            expect(gradient.steps[1].location).toBe(0.5);
            expect(gradient.steps[2].color).toEqual(ColorModel.analogous(color)[2]);
            expect(gradient.steps[2].location).toBe(1);
        });
    });

    describe('fromSplitComplementary', () => {
        it('should create a gradient model with split complementary colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromSplitComplementary(color);
            expect(gradient.steps.length).toBe(3);
            expect(gradient.steps[0].color).toStrictEqual(color);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toEqual(ColorModel.splitComplementary(color)[1]);
            expect(gradient.steps[1].location).toBe(0.5);
            expect(gradient.steps[2].color).toEqual(ColorModel.splitComplementary(color)[2]);
            expect(gradient.steps[2].location).toBe(1);
        });
    });

    describe('fromTetradic', () => {
        it('should create a gradient model with tetradic colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromTetradic(color);
            expect(gradient.steps.length).toBe(4);
            expect(gradient.steps[0].color).toStrictEqual(color);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toEqual(ColorModel.tetradic(color)[1]);
            expect(gradient.steps[1].location).toBeCloseTo(0.333);
            expect(gradient.steps[2].color).toEqual(ColorModel.tetradic(color)[2]);
            expect(gradient.steps[2].location).toBeCloseTo(0.666);
            expect(gradient.steps[3].color).toEqual(ColorModel.tetradic(color)[3]);
            expect(gradient.steps[3].location).toBe(1);
        });
    });

    describe('fromSquare', () => {
        it('should create a gradient model with square colors', () => {
            const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
            const gradient = GradientModel.fromSquare(color);
            expect(gradient.steps.length).toBe(4);
            expect(gradient.steps[0].color).toStrictEqual(color);
            expect(gradient.steps[0].location).toBe(0);
            expect(gradient.steps[1].color).toEqual(ColorModel.square(color)[1]);
            expect(gradient.steps[1].location).toBeCloseTo(0.333);
            expect(gradient.steps[2].color).toEqual(ColorModel.square(color)[2]);
            expect(gradient.steps[2].location).toBeCloseTo(0.666);
            expect(gradient.steps[3].color).toEqual(ColorModel.square(color)[3]);
            expect(gradient.steps[3].location).toBe(1);
        });
    });
});
