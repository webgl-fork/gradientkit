import { ColorModel } from './ColorModel';
import { CSS } from '../../formatters/css/css';

describe('ColorModel', () => {
    it('should set the hue correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.hue = 180;
        expect(color.hue).toBe(180);
    });

    it('should set the saturation correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.saturation = 75;
        expect(color.saturation).toBe(75);
    });

    it('should set the lightness correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.lightness = 25;
        expect(color.lightness).toBe(25);
    });

    it('should set the alpha channel correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 }, 0.5);
        color.alpha = 0.75;
        expect(color.alpha).toBe(0.75);
    });

    it('should set the hue correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.setHue(180);
        expect(color.hue).toBe(180);
    });

    it('should set the saturation correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.setSaturation(75);
        expect(color.saturation).toBe(75);
    });

    it('should set the lightness correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.setLightness(25);
        expect(color.lightness).toBe(25);
    });

    it('should set the alpha channel correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 }, 0.5);
        color.setAlpha(0.75);
        expect(color.alpha).toBe(0.75);
    });

    it('should correct hue values less than 0', () => {
        const color = new ColorModel({ hue: -10, saturation: 50, lightness: 50 });
        expect(color.hue).toBe(350);
    });

    it('should correct hue values greater than or equal to 360', () => {
        const color = new ColorModel({ hue: 400, saturation: 50, lightness: 50 });
        expect(color.hue).toBe(40);
    });

    it('should correct saturation values less than 0', () => {
        const color = new ColorModel({ hue: 0, saturation: -10, lightness: 50 });
        expect(color.saturation).toBe(0);
    });

    it('should correct saturation values greater than 100', () => {
        const color = new ColorModel({ hue: 0, saturation: 150, lightness: 50 });
        expect(color.saturation).toBe(100);
    });

    it('should correct lightness values less than 0', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: -10 });
        expect(color.lightness).toBe(0);
    });

    it('should correct lightness values greater than 100', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 150 });
        expect(color.lightness).toBe(100);
    });

    it('should return a valid complementary color', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const complementary = ColorModel.complementary(color);
        expect(complementary.hue).toBe(180);
        expect(complementary.saturation).toBe(50);
        expect(complementary.lightness).toBe(50);
    });

    it('should return valid triad-arranged colors', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const triad = ColorModel.triad(color);
        expect(triad.length).toBe(3);

        triad.forEach((c, index) => {
            expect(c.hue).toBe((color.hue + 120 * index) % 360);
            expect(c.saturation).toBe(color.saturation);
            expect(c.lightness).toBe(color.lightness);
        });
    });

    it('should return valid analogous colors', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const analogous = ColorModel.analogous(color);
        expect(analogous.length).toBe(3);

        [330, 0, 30].forEach((hue, i) => {
            const analogousColor = analogous[i];

            expect(analogousColor.hue).toBe(hue);
            expect(analogousColor.saturation).toBe(color.saturation);
            expect(analogousColor.lightness).toBe(color.lightness);
        });
    });

    it('should return valid split complementary colors', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const splitComplementary = ColorModel.splitComplementary(color);
        expect(splitComplementary.length).toBe(3);

        [0, 330, 30].forEach((hue, i) => {
            const splitComplementaryColor = splitComplementary[i];

            expect(splitComplementaryColor.hue).toBe(hue);
            expect(splitComplementaryColor.saturation).toBe(color.saturation);
            expect(splitComplementaryColor.lightness).toBe(color.lightness);
        });
    });

    it('should return valid tetradic colors', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const tetradic = ColorModel.tetradic(color);
        expect(tetradic.length).toBe(4);

        [0, 90, 180, 240].forEach((hue, i) => {
            const tetradicColor = tetradic[i];

            expect(tetradicColor.hue).toBe(hue);
            expect(tetradicColor.saturation).toBe(color.saturation);
            expect(tetradicColor.lightness).toBe(color.lightness);
        });
    });

    it('should return valid squared colors', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        const square = ColorModel.square(color);
        expect(square.length).toBe(4);

        [0, 90, 180, 270].forEach((hue, i) => {
            const squareColor = square[i];

            expect(squareColor.hue).toBe(hue);
            expect(squareColor.saturation).toBe(color.saturation);
            expect(squareColor.lightness).toBe(color.lightness);
        });
    });

    it('should return the correct HSL values', () => {
        const color = new ColorModel({ hue: 100, saturation: 25, lightness: 0 });
        expect(color.hsl.hue).toBe(100);
        expect(color.hsl.saturation).toBe(25);
        expect(color.hsl.lightness).toBe(0);
    });

    it('should return the correct RGB values for red', () => {
        const color = new ColorModel({ hue: 0, saturation: 100, lightness: 50 });
        expect(color.rgb.red).toBe(1);
        expect(color.rgb.green).toBe(0);
        expect(color.rgb.blue).toBe(0);
    });

    it('should return the correct RGB values for green', () => {
        const color = new ColorModel({ hue: 120, saturation: 100, lightness: 50 });
        expect(color.rgb.red).toBe(0);
        expect(color.rgb.green).toBe(1);
        expect(color.rgb.blue).toBe(0);
    });

    it('should return the correct RGB values for blue', () => {
        const color = new ColorModel({ hue: 240, saturation: 100, lightness: 50 });
        expect(color.rgb.red).toBe(0);
        expect(color.rgb.green).toBe(0);
        expect(color.rgb.blue).toBe(1);
    });

    it('should return the correct RGB values for gray', () => {
        const color = new ColorModel({ hue: 0, saturation: 0, lightness: 50 });
        expect(color.rgb.red).toBe(0.5);
        expect(color.rgb.green).toBe(0.5);
        expect(color.rgb.blue).toBe(0.5);
    });

    it('should return the correct RGB values for white', () => {
        const color = new ColorModel({ hue: 0, saturation: 0, lightness: 100 });
        expect(color.rgb.red).toBe(1);
        expect(color.rgb.green).toBe(1);
        expect(color.rgb.blue).toBe(1);
    });

    it('should return the correct RGB values for black', () => {
        const color = new ColorModel({ hue: 0, saturation: 0, lightness: 0 });
        expect(color.rgb.red).toBe(0);
        expect(color.rgb.green).toBe(0);
        expect(color.rgb.blue).toBe(0);
    });

    it('should rotate the hue correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });
        color.rotate(90);
        expect(color.hue).toBe(90);

        color.rotate(90);

        expect(color.hue).toBe(180);
    });

    it('should format the color correctly', () => {
        const color = new ColorModel({ hue: 0, saturation: 50, lightness: 50 });

        expect(color.format(CSS.color)).toBe('hsl(0, 50%, 50%)');
        expect(color.rotate(650).format(CSS.color)).toBe('hsl(290, 50%, 50%)');
    });
});
