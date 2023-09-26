import { ColorModel } from '../color/ColorModel';

type GradientStop = {
    color: ColorModel;
    location: number;
};

export class GradientModel {
    /** Internal representation of the gradient sequence */
    private _stops: GradientStop[] = [];

    constructor(colors: ColorModel[]);
    constructor(steps: GradientStop[]);
    constructor(colorsOrStops: GradientStop[] | ColorModel[]) {
        this.stops = colorsOrStops;
    }

    /** Initializes stops from colors */
    private getStopsFromColors(colors: ColorModel[]) {
        const tempStops = [];

        for (const [index, color] of colors.entries()) {
            if (color instanceof ColorModel) {
                tempStops.push({
                    color,
                    location: index / (colors.length - 1)
                });
            }
        }

        return tempStops;
    }

    /** Returns the gradient stops */
    get stops(): GradientStop[] {
        return this._stops;
    }

    /** Sets the gradient stops */
    set stops(colorsOrStops: ColorModel[] | GradientStop[]) {
        const inputsAreColors = colorsOrStops.every(colorOrStop => colorOrStop instanceof ColorModel);
        const inputsAreStops = colorsOrStops.every(colorOrStop => 'color' in colorOrStop && 'location' in colorOrStop);
        const stops = inputsAreColors
            ? this.getStopsFromColors(colorsOrStops as ColorModel[])
            : inputsAreStops
            ? (colorsOrStops as GradientStop[])
            : [];

        this._stops = stops.sort((a, b) => a.location - b.location);
    }

    /** Sets gradient model with a complementary color */
    public fromComplementary(model: ColorModel) {
        this.stops = [model, ColorModel.complementary(model)];

        return this;
    }

    /** Sets gradient model with triad colors */
    public fromTriad(model: ColorModel) {
        this.stops = ColorModel.triad(model);

        return this;
    }

    /** Sets gradient model with analogous colors */
    public fromAnalogous(model: ColorModel) {
        this.stops = ColorModel.analogous(model);

        return this;
    }

    /** Sets gradient model with split complementary colors */
    public fromSplitComplementary(model: ColorModel) {
        this.stops = ColorModel.splitComplementary(model);

        return this;
    }

    /** Sets gradient model with tetradic colors */
    public fromTetradic(model: ColorModel) {
        this.stops = ColorModel.tetradic(model);

        return this;
    }

    /** Sets gradient model with squared colors */
    public fromSquare(model: ColorModel) {
        this.stops = ColorModel.square(model);

        return this;
    }
}

type Point = { x: number; y: number };

export class LinearGradientModel extends GradientModel {
    /** The angle of the gradient */
    private _angle = 0;

    /** The start point of the gradient */
    public startPoint: Point;

    /** The end point of the gradient */
    public endPoint: Point;

    constructor(angle: number, startPoint: Point, endPoint: Point, steps: GradientStop[]) {
        super(steps);

        this.angle = angle;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    /** Returns the width of the gradient */
    public get width(): number {
        return this.endPoint.x - this.startPoint.x;
    }

    /** Sets the width of the gradient */
    public set width(width: number) {
        this.endPoint.x = this.startPoint.x + width;
    }

    /** Returns the height of the gradient */
    public get height(): number {
        return this.endPoint.y - this.startPoint.y;
    }

    /** Sets the height of the gradient */
    public set height(height: number) {
        this.endPoint.y = this.startPoint.y + height;
    }

    /** Returns the size of the gradient */
    public get size(): Point {
        return { x: this.width, y: this.height };
    }

    /** Sets the size of the gradient */
    public set size(size: Point) {
        this.width = size.x;
        this.height = size.y;
    }

    /** Returns the angle of the gradient */
    public get angle(): number {
        return this._angle;
    }

    /** Sets the angle of the gradient */
    public set angle(angle: number) {
        this._angle = angle % 360;
    }

    /** Returns the length of the gradient */
    public get length(): number {
        const dx = this.endPoint.x - this.startPoint.x;
        const dy = this.endPoint.y - this.startPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /** Sets the length of the gradient */
    public set length(length: number) {
        const dx = this.endPoint.x - this.startPoint.x;
        const dy = this.endPoint.y - this.startPoint.y;
        const angle = Math.atan2(dy, dx);
        this.endPoint.x = this.startPoint.x + length * Math.cos(angle);
        this.endPoint.y = this.startPoint.y + length * Math.sin(angle);
    }

    /** Returns the center point of the gradient */
    public get centerPoint(): Point {
        const x = (this.startPoint.x + this.endPoint.x) / 2;
        const y = (this.startPoint.y + this.endPoint.y) / 2;
        return { x, y };
    }

    /** Sets the center point of the gradient */
    public set centerPoint(centerPoint: Point) {
        const dx = centerPoint.x - this.centerPoint.x;
        const dy = centerPoint.y - this.centerPoint.y;
        this.startPoint.x += dx;
        this.startPoint.y += dy;
        this.endPoint.x += dx;
        this.endPoint.y += dy;
    }

    /** Formats the Gradient */
    public format(formatter: (gradient: LinearGradientModel) => string) {
        return formatter(this);
    }
}

export class RadialGradientModel extends GradientModel {
    /** The coordinates of the center of the gradient */
    public center: Point;

    /** The radius of the gradient */
    public radius: number;

    constructor(center: Point, radius: number, steps: GradientStop[]) {
        super(steps);

        this.center = center;
        this.radius = radius;
    }

    /** Returns the diameter of the gradient */
    public get diameter(): number {
        return this.radius * 2;
    }

    /** Sets the diameter of the gradient */
    public set diameter(diameter: number) {
        this.radius = diameter / 2;
    }

    /** Returns the circumference of the gradient */
    public get circumference(): number {
        return 2 * Math.PI * this.radius;
    }

    /** Sets the circumference of the gradient */
    public set circumference(circumference: number) {
        this.radius = circumference / (2 * Math.PI);
    }
}
