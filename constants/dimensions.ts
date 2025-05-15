import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// iPhone 15 Pro dimensions
const IPHONE_15_PRO_WIDTH = 393;
const IPHONE_15_PRO_HEIGHT = 852;

// Calculate scale factors
const scaleWidth = width / IPHONE_15_PRO_WIDTH;
const scaleHeight = height / IPHONE_15_PRO_HEIGHT;

// Standard scale factor (use the smaller one to ensure everything fits)
const scale = Math.min(scaleWidth, scaleHeight);

// Status bar height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

// Standard dimensions
export const DIMENSIONS = {
    // Screen dimensions
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    SCALE: scale,

    // Status bar
    STATUS_BAR_HEIGHT,

    // Safe area
    SAFE_AREA_TOP: Platform.OS === 'ios' ? 59 : STATUS_BAR_HEIGHT,
    SAFE_AREA_BOTTOM: Platform.OS === 'ios' ? 34 : 0,

    // Spacing
    SPACING: {
        XS: 4 * scale,
        SM: 8 * scale,
        MD: 16 * scale,
        LG: 24 * scale,
        XL: 32 * scale,
        XXL: 48 * scale,
    },

    // Font sizes
    FONT_SIZE: {
        XS: 12 * scale,
        SM: 14 * scale,
        MD: 16 * scale,
        LG: 18 * scale,
        XL: 20 * scale,
        XXL: 24 * scale,
        XXXL: 32 * scale,
    },

    // Button dimensions
    BUTTON: {
        HEIGHT: 52 * scale,
        BORDER_RADIUS: 25 * scale,
        PADDING_HORIZONTAL: 24 * scale,
    },

    // Input dimensions
    INPUT: {
        HEIGHT: 52 * scale,
        BORDER_RADIUS: 25 * scale,
        PADDING_HORIZONTAL: 16 * scale,
        FONT_SIZE: 16 * scale,
    },

    // Card dimensions
    CARD: {
        BORDER_RADIUS: 20 * scale,
        PADDING: 16 * scale,
        MARGIN: 8 * scale,
    },

    // Image dimensions
    IMAGE: {
        LOGO: {
            WIDTH: 120 * scale,
            HEIGHT: 120 * scale,
        },
        BANNER: {
            WIDTH: width,
            HEIGHT: 200 * scale,
        },
        THUMBNAIL: {
            WIDTH: 80 * scale,
            HEIGHT: 80 * scale,
        },
    },

    // Icon dimensions
    ICON: {
        SM: 16 * scale,
        MD: 24 * scale,
        LG: 32 * scale,
        XL: 48 * scale,
    },

    // Header dimensions
    HEADER: {
        HEIGHT: 60 * scale,
        FONT_SIZE: 24 * scale,
    },

    // Bottom tab dimensions
    BOTTOM_TAB: {
        HEIGHT: 83 * scale, // Includes safe area
        ICON_SIZE: 24 * scale,
        FONT_SIZE: 12 * scale,
    },

    // Modal dimensions
    MODAL: {
        BORDER_RADIUS: 20 * scale,
        PADDING: 24 * scale,
    },

    // OTP input dimensions
    OTP: {
        INPUT_SIZE: 40 * scale,
        INPUT_SPACING: 10 * scale,
        CONTAINER_PADDING: 20 * scale,
    },

    // Social button dimensions
    SOCIAL_BUTTON: {
        WIDTH: 48 * scale,
        HEIGHT: 48 * scale,
        BORDER_RADIUS: 24 * scale,
        ICON_SIZE: 24 * scale,
    },

    // Checkbox dimensions
    CHECKBOX: {
        SIZE: 24 * scale,
        BORDER_RADIUS: 4 * scale,
    },

    // List item dimensions
    LIST_ITEM: {
        HEIGHT: 72 * scale,
        PADDING: 16 * scale,
        BORDER_RADIUS: 12 * scale,
    },

    // Badge dimensions
    BADGE: {
        HEIGHT: 20 * scale,
        PADDING_HORIZONTAL: 8 * scale,
        BORDER_RADIUS: 10 * scale,
        FONT_SIZE: 12 * scale,
    },

    // Avatar dimensions
    AVATAR: {
        SM: 32 * scale,
        MD: 48 * scale,
        LG: 64 * scale,
        XL: 96 * scale,
    },
};

// Helper function to scale a number
export const scaleSize = (size: number) => size * scale;

// Helper function to get responsive font size
export const getFontSize = (size: number) => size * scale;

// Helper function to get responsive padding/margin
export const getSpacing = (size: number) => size * scale;

// Helper function to get responsive width/height
export const getDimension = (size: number) => size * scale;

// Helper function to get responsive border radius
export const getBorderRadius = (size: number) => size * scale;

// Helper function to get responsive icon size
export const getIconSize = (size: number) => size * scale;

// Helper function to get responsive button size
export const getButtonSize = (size: number) => size * scale;

// Helper function to get responsive input size
export const getInputSize = (size: number) => size * scale;

// Helper function to get responsive card size
export const getCardSize = (size: number) => size * scale;

// Helper function to get responsive image size
export const getImageSize = (size: number) => size * scale;

// Helper function to get responsive list item size
export const getListItemSize = (size: number) => size * scale;

// Helper function to get responsive badge size
export const getBadgeSize = (size: number) => size * scale;

// Helper function to get responsive avatar size
export const getAvatarSize = (size: number) => size * scale; 