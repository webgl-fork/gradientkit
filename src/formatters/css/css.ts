import { ColorModel } from '@/models/color/ColorModel';
import { GradientModel } from '@/models/gradient/GradientModel';

const ColorFormatter = (model: ColorModel) => {
    return `hsl(${model.hue}, ${model.saturation}%, ${model.lightness}%)`;
};

const GradientFormatter = (model: GradientModel) => {
    const steps = model.steps
        .map(({ color, location }) => {
            return `${color.format(ColorFormatter)} ${location * 100}%`;
        })
        .join(', ');

    return `linear-gradient(to right, ${steps});`;
};

export const CSS = {
    color: ColorFormatter,
    gradient: GradientFormatter
};
