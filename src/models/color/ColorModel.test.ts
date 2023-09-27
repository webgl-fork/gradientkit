import { ColorModel } from './ColorModel';

describe('ColorModel', () => {
    it('should set the luminance correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.luminance = 25;
        expect(color.luminance).toBe(25);
    });

    it('should set the chroma correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.chroma = 75;
        expect(color.chroma).toBe(75);
    });

    it('should set the hue correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.hue = 180;
        expect(color.hue).toBe(180);
    });

    it('should set the alpha channel correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 }, 0.5);
        color.alpha = 0.75;
        expect(color.alpha).toBe(0.75);
    });

    it('should set the hue correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.setHue(180);
        expect(color.hue).toBe(180);
    });

    it('should set the chroma correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.setChroma(75);
        expect(color.chroma).toBe(75);
    });

    it('should set the luminance correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.setLuminance(25);
        expect(color.luminance).toBe(25);
    });

    it('should set the alpha channel correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 }, 0.5);
        color.setAlpha(0.75);
        expect(color.alpha).toBe(0.75);
    });

    it('should correct luminance values less than 0', () => {
        const color = new ColorModel({ luminance: -10, chroma: 50, hue: 0 });
        expect(color.luminance).toBe(0);
    });

    it('should correct luminance values greater than 100', () => {
        const color = new ColorModel({ luminance: 150, chroma: 50, hue: 0 });
        expect(color.luminance).toBe(100);
    });

    it('should correct chroma values less than 0', () => {
        const color = new ColorModel({ luminance: 50, chroma: -10, hue: 0 });
        expect(color.chroma).toBe(0);
    });

    it('should correct hue values less than 0', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: -10 });
        expect(color.hue).toBe(350);
    });

    it('should correct hue values greater than or equal to 360', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 400 });
        expect(color.hue).toBe(40);
    });

    it('should correct chroma values greater than 230', () => {
        const color = new ColorModel({ luminance: 50, chroma: 250, hue: 0 });
        expect(color.chroma).toBe(230);
    });

    it('should return a valid complementary color', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const complementary = ColorModel.complementary(color);

        expect(complementary.luminance).toBe(50);
        expect(complementary.chroma).toBe(50);
        expect(complementary.hue).toBe(180);
    });

    it('should return valid triad-arranged colors', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const triad = ColorModel.triad(color);
        expect(triad.length).toBe(3);

        triad.forEach((c, index) => {
            expect(c.luminance).toBe(color.luminance);
            expect(c.chroma).toBe(color.chroma);
            expect(c.hue).toBe((color.hue + 120 * index) % 360);
        });
    });

    it('should return valid analogous colors', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const analogous = ColorModel.analogous(color);
        expect(analogous.length).toBe(3);

        [330, 0, 30].forEach((hue, i) => {
            const analogousColor = analogous[i];

            expect(analogousColor.luminance).toBe(color.luminance);
            expect(analogousColor.chroma).toBe(color.chroma);
            expect(analogousColor.hue).toBe(hue);
        });
    });

    it('should return valid split-complementary colors', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const splitComplementary = ColorModel.splitComplementary(color);
        expect(splitComplementary.length).toBe(3);

        [0, 330, 30].forEach((hue, i) => {
            const splitComplementaryColor = splitComplementary[i];

            expect(splitComplementaryColor.luminance).toBe(color.luminance);
            expect(splitComplementaryColor.chroma).toBe(color.chroma);
            expect(splitComplementaryColor.hue).toBe(hue);
        });
    });

    it('should return valid tetradic colors', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const tetradic = ColorModel.tetradic(color);
        expect(tetradic.length).toBe(4);

        [0, 90, 180, 240].forEach((hue, i) => {
            const tetradicColor = tetradic[i];

            expect(tetradicColor.luminance).toBe(color.luminance);
            expect(tetradicColor.chroma).toBe(color.chroma);
            expect(tetradicColor.hue).toBe(hue);
        });
    });

    it('should return valid square-arranged colors', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        const square = ColorModel.square(color);
        expect(square.length).toBe(4);

        [0, 90, 180, 270].forEach((hue, i) => {
            const squareColor = square[i];

            expect(squareColor.luminance).toBe(color.luminance);
            expect(squareColor.chroma).toBe(color.chroma);
            expect(squareColor.hue).toBe(hue);
        });
    });

    it('should return the correct HSL values', () => {
        const color = new ColorModel({ luminance: 0, chroma: 25, hue: 100 });
        expect(color.hue).toBe(100);
        expect(color.chroma).toBe(25);
        expect(color.luminance).toBe(0);
    });

    it('should return the correct RGB values for red', () => {
        const color = new ColorModel({ luminance: 50, chroma: 100, hue: 0 });
        expect(color.rgb.red).toBe(255);
        expect(color.rgb.green).toBe(0);
        expect(color.rgb.blue).toBe(123);
    });

    it('should return the correct RGB values for green', () => {
        const color = new ColorModel({ luminance: 50, chroma: 100, hue: 120 });
        expect(color.rgb.red).toBe(52);
        expect(color.rgb.green).toBe(137);
        expect(color.rgb.blue).toBe(0);
    });

    it('should return the correct RGB values for blue', () => {
        const color = new ColorModel({ luminance: 50, chroma: 100, hue: 240 });
        expect(color.rgb.red).toBe(0);
        expect(color.rgb.green).toBe(148);
        expect(color.rgb.blue).toBe(255);
    });

    it('should return the correct RGB values for gray', () => {
        const color = new ColorModel({ luminance: 50, chroma: 0, hue: 0 });
        expect(color.rgb.red).toBe(119);
        expect(color.rgb.green).toBe(119);
        expect(color.rgb.blue).toBe(119);
    });

    it('should return the correct RGB values for white', () => {
        const color = new ColorModel({ luminance: 100, chroma: 0, hue: 0 });
        expect(color.rgb.red).toBe(255);
        expect(color.rgb.green).toBe(255);
        expect(color.rgb.blue).toBe(255);
    });

    it('should return the correct RGB values for black', () => {
        const color = new ColorModel({ luminance: 0, chroma: 0, hue: 0 });
        expect(color.rgb.red).toBe(0);
        expect(color.rgb.green).toBe(0);
        expect(color.rgb.blue).toBe(0);
    });

    it('should rotate the hue correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 });
        color.rotate(90);
        expect(color.hue).toBe(90);

        color.rotate(90);

        expect(color.hue).toBe(180);
    });

    it('should format the color correctly', () => {
        const color = new ColorModel({ luminance: 50, chroma: 50, hue: 0 }, 0.3);

        expect(color.css()).toBe('lch(50% 50 0 / 0.3)');
        expect(color.rotate(650).css()).toBe('lch(50% 50 290 / 0.3)');
    });
});
