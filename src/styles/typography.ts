import {TextStyle} from 'react-native';
import {systemWeights} from 'react-native-typography';

type FontSize = 'fs13' | 'fs14' | 'fs15' | 'fs16' | 'fs23';
export const fontSize: Record<FontSize, TextStyle> = {
  fs13: {
    fontSize: 13,
  },
  fs14: {
    fontSize: 14,
  },
  fs15: {
    fontSize: 15,
  },
  fs16: {
    fontSize: 16,
  },
  fs23: {
    fontSize: 23,
  },
};

type FontWeight = 'regular' | 'semibold' | 'bold';
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    ...systemWeights.regular,
  },
  semibold: {
    ...systemWeights.semibold,
  },
  bold: {
    ...systemWeights.bold,
  },
};

type LetterSpacing = 'x10' | 'x20';
export const letterSpacing: Record<LetterSpacing, number> = {
  x10: 0.2,
  x20: 0.3,
};

type LineHeight = 'lh16' | 'lh18' | 'lh21' | 'lh24' | 'lh30';
export const lineHeight: Record<LineHeight, TextStyle> = {
  lh16: {
    lineHeight: 16,
  },
  lh18: {
    lineHeight: 18,
  },
  lh21: {
    lineHeight: 21,
  },
  lh24: {
    lineHeight: 24,
  },
  lh30: {
    lineHeight: 30,
  },
};

type Header = 'x10' | 'x20' | 'x30';
export const header: Record<Header, TextStyle> = {
  x10: {
    ...fontSize.fs14,
    ...fontWeight.semibold,
    ...lineHeight.lh16,
  },
  x20: {
    ...fontSize.fs15,
    ...fontWeight.semibold,
    ...lineHeight.lh18,
  },
  x30: {
    ...fontSize.fs23,
    ...fontWeight.bold,
    ...lineHeight.lh30,
  },
};
type Body = 'x10' | 'x20' | 'x30';
export const body: Record<Body, TextStyle> = {
  x10: {
    ...fontSize.fs13,
    ...fontWeight.regular,
    ...lineHeight.lh18,
  },
  x20: {
    ...fontSize.fs14,
    ...fontWeight.regular,
    ...lineHeight.lh18,
  },
  x30: {
    ...fontSize.fs15,
    ...fontWeight.regular,
    ...lineHeight.lh18,
  },
};
const monospaceFontFamily = 'Roboto';
type Monospace = 'base';
export const monospace: Record<Monospace, TextStyle> = {
  base: {
    fontFamily: monospaceFontFamily,
  },
};
