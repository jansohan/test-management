export const COLORS = {
  primary: '#384EC7',
  primaryLight: '#f8faff',
  primaryHover: '#7489FF',
  success: '#2AB7A9',
  warning: '#E9B406',
  navy: '#07013C',
  border: '#E5E7EB',
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = (typeof COLORS)[ColorKey];
