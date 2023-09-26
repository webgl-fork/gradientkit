type RGBModel = {
    red: number;
    green: number;
    blue: number;
};

type HSLModel = {
    hue: number;
    saturation: number;
    lightness: number;
};

export class ColorModel {
    /** Internal Color Model */
    private color: HSLModel = { hue: 0, saturation: 0, lightness: 0 };

    /** Alpha channel */
    private _alpha = 1;

    /** Returns a model with complementary color */
    public static complementary(model: ColorModel) {
        return model.clone().rotate(180);
    }

    /** Returns three models with triad-arranged colors */
    public static triad(model: ColorModel) {
        return [model.clone(), model.clone().rotate(120), model.clone().rotate(240)];
    }

    /** Returns three models with analogous colors */
    public static analogous(model: ColorModel) {
        return [model.clone().rotate(-30), model.clone(), model.clone().rotate(30)];
    }

    /** Returns three models with split complementary colors */
    public static splitComplementary(model: ColorModel) {
        return [model.clone(), model.clone().rotate(-30), model.clone().rotate(30)];
    }

    /** Returns four models with tetradic colors */
    public static tetradic(model: ColorModel) {
        return [model.clone(), model.clone().rotate(90), model.clone().rotate(180), model.clone().rotate(240)];
    }

    /** Returns four models with squared colors */
    public static square(model: ColorModel) {
        return [model.clone(), model.clone().rotate(90), model.clone().rotate(180), model.clone().rotate(270)];
    }

    constructor(color: HSLModel, alpha = 1) {
        this.setHue(color.hue);
        this.setSaturation(color.saturation);
        this.setLightness(color.lightness);
        this.setAlpha(alpha);
    }

    /** Returns the Hue */
    get hue(): number {
        return this.color.hue;
    }

    /** Sets the Hue */
    set hue(hue: number) {
        this.setHue(hue);
    }

    /** Sets the Hue */
    public setHue(hue: number) {
        hue = hue % 360;
        hue = hue < 0 ? 360 + hue : hue;
        this.color.hue = Math.max(hue, 0) % 360;
    }

    /** Returns the Saturation */
    get saturation(): number {
        return this.color.saturation;
    }

    /** Sets the Saturation */
    set saturation(saturation: number) {
        this.setSaturation(saturation);
    }

    /** Sets the Saturation */
    public setSaturation(saturation: number) {
        this.color.saturation = Math.min(Math.max(saturation, 0), 100);
    }

    /** Returns the Lightness */
    get lightness(): number {
        return this.color.lightness;
    }

    /** Sets the Lightess */
    set lightness(lightness: number) {
        this.setLightness(lightness);
    }

    /** Sets the Lightness */
    public setLightness(lightness: number) {
        this.color.lightness = Math.min(Math.max(lightness, 0), 100);
    }

    /** Returns the Alpha channel */
    get alpha(): number {
        return this._alpha;
    }

    /** Sets the Alpha channel */
    set alpha(alpha: number) {
        this.setAlpha(alpha);
    }

    /** Sets the Alpha */
    public setAlpha(alpha: number) {
        this._alpha = Math.min(Math.max(alpha, 0), 1);
    }

    /** Returns the model as HSL */
    get hsl(): HSLModel {
        return this.color;
    }

    /** Returns the model as RGB */
    get rgb(): RGBModel {
        const h = this.color.hue / 360;
        const s = this.color.saturation / 100;
        const l = this.color.lightness / 100;
        let t2;
        let t3;
        let val;

        if (s === 0) {
            return {
                red: l,
                green: l,
                blue: l
            };
        }

        if (l < 0.5) {
            t2 = l * (1 + s);
        } else {
            t2 = l + s - l * s;
        }

        const t1 = 2 * l - t2;

        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            t3 = h + (1 / 3) * -(i - 1);
            if (t3 < 0) {
                t3++;
            }

            if (t3 > 1) {
                t3--;
            }

            if (6 * t3 < 1) {
                val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
                val = t2;
            } else if (3 * t3 < 2) {
                val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
                val = t1;
            }

            rgb[i] = val;
        }

        return {
            red: rgb[0],
            green: rgb[1],
            blue: rgb[2]
        };
    }

    /** Clones the model */
    public clone() {
        return new ColorModel(this.color, this.alpha);
    }

    /** Rotates the Hue */
    public rotate(degrees: number) {
        let hue = this.hue;

        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;

        this.setHue(hue);

        return this;
    }

    /** Returns a model with complementary color */
    public complementary() {
        return ColorModel.complementary(this);
    }

    /** Returns three models with triad-arranged colors */
    public triad() {
        return ColorModel.triad(this);
    }

    /** Returns three models with analogous colors */
    public analogous() {
        return ColorModel.analogous(this);
    }

    /** Returns three models with split complementary colors */
    public splitComplementary() {
        return ColorModel.splitComplementary(this);
    }

    /** Returns four models with tetradic colors */
    public tetradic() {
        return ColorModel.tetradic(this);
    }

    /** Returns four models with squared colors */
    public square() {
        return ColorModel.square(this);
    }

    /** Formats the model into a given format */
    public format(formatter: (model: ColorModel) => string) {
        return formatter(this);
    }
}
