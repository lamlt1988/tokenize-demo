type Neutral = 'white' | 'black' | 'gray01' | 'gray02' | 'gray03' | 'gray04';
export const neutral: Record<Neutral, string> = {
  white: '#FFFFFF',
  gray01: '#3D436C',
  gray02: '#8E92B2',
  gray03: '#E4E9F9',
  gray04: '#D6E1FF',
  black: '#000000',
};

type Primary = 'brand' | 'brand01' | 'brand02';
export const primary: Record<Primary, string> = {
  brand: '#6081FA',
  brand01: '#6992FF',
  brand02: '#5073F2',
};

type Danger = 'error';
export const danger: Record<Danger, string> = {
  error: '#F94B5C',
};

type Success = 'completed';
export const success: Record<Success, string> = {
  completed: '#3BBA7D',
};

const applyOpacity = (hexColor: string, opacity: number): string => {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

type Transparent = 'clear' | 'lightGray' | 'darkGray';
export const transparent: Record<Transparent, string> = {
  clear: 'rgba(255, 255, 255, 0)',
  lightGray: applyOpacity(neutral.gray01, 0.4),
  darkGray: applyOpacity(neutral.gray02, 0.8),
};
