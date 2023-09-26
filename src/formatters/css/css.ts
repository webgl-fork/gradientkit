import { ColorModel } from '../../models/color/ColorModel';
import { LinearGradientModel } from '../../models/gradient/GradientModel';

const ColorFormatter = (model: ColorModel) => {
    return `hsl(${model.hue}, ${model.saturation}%, ${model.lightness}%)`;
};

const LinearGradientFormatter = (model: LinearGradientModel) => {
    const steps = model.stops
        .map(({ color, location }) => {
            return `${color.format(ColorFormatter)} ${location * 100}%`;
        })
        .join(', ');

    return `linear-gradient(${model.angle}deg, ${steps});`;
};

export const CSS = {
    color: ColorFormatter,
    linearGradient: LinearGradientFormatter
};
