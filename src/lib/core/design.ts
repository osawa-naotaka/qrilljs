export type ColorValue = [number, number, number]; // rgb
export type SizeValue = string; // rem or other value
export type BrightnessValue = string; // persentage (color mix to black or white)

export type ColorSet = {
    primary: ColorVariant;
    secondary: ColorVariant;
    thirdary: ColorVariant;
    forthary: ColorVariant;
    accent: ColorVariant;
    text: ColorVariant;
    text_secondary: ColorVariant;
    background: ColorVariant;
    background_secondary: ColorVariant;
    success: ColorVariant;
    error: ColorVariant;
    warning: ColorVariant;
    info: ColorVariant;
};

export type ColorVariant = {
    main: ColorValue;
    light: ColorValue;
    dark: ColorValue;
};

export type BrightnessSet = {
    lightest: BrightnessValue;
    light: BrightnessValue;
    dark: BrightnessValue;
    darkest: BrightnessValue;
};

export type ColorRule = {
    category: ColorSet;
    brightness: BrightnessSet;
};

export type SizeRem = {
    tiny: SizeValue;
    small: SizeValue;
    medium: SizeValue;
    large: SizeValue;
    xlarge: SizeValue;
    x2large: SizeValue;
    x3large: SizeValue;
};

export type SizeRule<S extends SizeRem | Partial<SizeRem>> = {
    root: number; // pixel
    line_height: number;
    font: S;
    spacing: S;
    width: S;
};

export type DesignRule = {
    color: {
        category: ColorSet;
        brightness: BrightnessSet;
    };
    size: {
        font: SizeRem;
        spacing: SizeRem;
        width: SizeRem;
    };
    font: {
        family: string[];
        base_size: string;
        line_height: string;
    };
};

export const default_design_rule: DesignRule = {
    color: {
        category: {
            primary: {
                main: [63, 81, 181], // #3f51b5
                light: [121, 134, 203], // #7986cb
                dark: [26, 35, 126], // #1a237e
            },
            secondary: {
                main: [76, 175, 80], // #4caf50
                light: [129, 199, 132], // #81c784
                dark: [27, 94, 32], // #1b5e20
            },
            thirdary: {
                main: [255, 193, 7], // #ffc107
                light: [255, 224, 130], // #ffe082
                dark: [255, 160, 0], // #ffa000
            },
            forthary: {
                main: [0, 188, 212], // #00bcd4
                light: [77, 208, 225], // #4dd0e1
                dark: [0, 151, 167], // #0097a7
            },
            accent: {
                main: [255, 64, 129], // #ff4081
                light: [255, 128, 171], // #ff80ab
                dark: [216, 27, 96], // #d81b60
            },
            text: {
                main: [33, 33, 33], // #212121
                light: [66, 66, 66], // #424242
                dark: [0, 0, 0], // #000000
            },
            text_secondary: {
                light: [255, 255, 255], // #ffffff
                main: [245, 245, 245], // #f5f5f5
                dark: [200, 200, 200], // #c8c8c8
            },
            background: {
                main: [240, 240, 240], // #f0f0f0
                light: [250, 250, 250], // #fafafa
                dark: [200, 200, 200], // #c8c8c8
            },
            background_secondary: {
                main: [33, 33, 33], // #212121
                light: [66, 66, 66], // #424242
                dark: [0, 0, 0], // #000000
            },
            success: {
                main: [33, 186, 69], // #21ba45
                light: [102, 204, 102], // #66cc66
                dark: [0, 105, 33], // #006921
            },
            error: {
                main: [219, 40, 40], // #db2828
                light: [239, 83, 80], // #ef5350
                dark: [183, 28, 28], // #b71c1c
            },
            warning: {
                main: [242, 113, 28], // #f2711c
                light: [255, 152, 0], // #ff9800
                dark: [191, 54, 12], // #bf360c
            },
            info: {
                main: [49, 204, 236], // #31ccec
                light: [77, 208, 225], // #4dd0e1
                dark: [1, 87, 155], // #01579b
            },
        },
        brightness: {
            lightest: "60%",
            light: "80%",
            dark: "80%",
            darkest: "60%",
        },
    },
    size: {
        font: {
            tiny: "0.75rem",
            small: "0.875rem",
            medium: "1rem",
            large: "1.125rem",
            xlarge: "1.25rem",
            x2large: "1.5rem",
            x3large: "2rem",
        },
        spacing: {
            tiny: "0.25rem",
            small: "0.5rem",
            medium: "1rem",
            large: "1.25rem",
            xlarge: "1.5rem",
            x2large: "2rem",
            x3large: "4rem",
        },
        width: {
            tiny: "450px", // 25rem
            small: "540px", // 30rem
            medium: "720px", // 40rem
            large: "960px", // 53rem
            xlarge: "1200px", // 66rem
            x2large: "1440px", // 80rem
            x3large: "1600px", // 88rem
        },
    },
    font: {
        family: ['"Helvetica Neue"', "Arial", "sans-serif"],
        base_size: "18px",
        line_height: "1.8",
    },
};
