import { ColorModel } from '@/models/color/ColorModel';

type GradientStep = {
    color: ColorModel;
    location: number;
};

export class GradientModel {
    /** Internal representation of the gradient sequence */
    private _steps: GradientStep[] = [];

    /** Returns a gradient model with a complementary color */
    public static fromComplementary(model: ColorModel) {
        return new GradientModel([model, ColorModel.complementary(model)]);
    }

    /** Returns a gradient model with triad colors */
    public static fromTriad(model: ColorModel) {
        return new GradientModel(ColorModel.triad(model));
    }

    /** Returns a gradient model with analogous colors */
    public static fromAnalogous(model: ColorModel) {
        return new GradientModel(ColorModel.analogous(model));
    }

    /** Returns a gradient model with split complementary colors */
    public static fromSplitComplementary(model: ColorModel) {
        return new GradientModel(ColorModel.splitComplementary(model));
    }

    /** Returns a gradient model with tetradic colors */
    public static fromTetradic(model: ColorModel) {
        return new GradientModel(ColorModel.tetradic(model));
    }

    /** Returns a gradient model with squared colors */
    public static fromSquare(model: ColorModel) {
        return new GradientModel(ColorModel.square(model));
    }

    constructor(colors: ColorModel[]);
    constructor(steps: GradientStep[]);
    constructor(colorsOrSteps: GradientStep[] | ColorModel[]) {
        for (const [index, colorOrStep] of colorsOrSteps.entries()) {
            if (colorOrStep instanceof ColorModel) {
                this._steps.push({
                    color: colorOrStep,
                    location: index / (colorsOrSteps.length - 1)
                });
            } else {
                this._steps.push(colorOrStep);
            }
        }
    }

    /** Returns the gradient steps */
    get steps(): GradientStep[] {
        return this._steps;
    }

    /** Sets the gradient steps */
    set steps(steps: GradientStep[]) {
        this._steps = steps.sort((a, b) => a.location - b.location);
    }
}

export class LinearGradientModel extends GradientModel {
    /** The angle of the gradient */
    public angle: number;

    constructor(angle: number, steps: GradientStep[]) {
        super(steps);
        this.angle = angle;
    }
}

export class RadialGradientModel extends GradientModel {
    /** The x coordinate of the center of the gradient */
    public x: number;

    /** The y coordinate of the center of the gradient */
    public y: number;

    /** The radius of the gradient */
    public radius: number;

    constructor(x: number, y: number, radius: number, steps: GradientStep[]) {
        super(steps);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
