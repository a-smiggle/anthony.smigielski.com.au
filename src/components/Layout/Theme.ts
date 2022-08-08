type Theme = {
  textColor: string;
  textColorDark: string;
  linkColor: string;
  linkColorDark: string;
  borderColor: string;
  borderColorHover: string;
  borderColorDark: string;
  borderColorDarkHover: string;
  bgColor: string;
  bgColorDark: string;
};

const baseTheme: Theme = {
  textColor: '',
  textColorDark: 'dark:text-slate-300',
  linkColor: 'hover:text-emerald-500',
  linkColorDark: 'dark:hover:text-emerald-500 dark:text-slate-300',
  borderColor: 'border-emerald-500',
  borderColorHover: 'hover:border-emerald-500',
  borderColorDark: 'dark:border-emerald-500',
  borderColorDarkHover: 'dark:hover:border-emerald-500',
  bgColor: 'bg-white',
  bgColorDark: 'dark:bg-slate-800',
};
const husbandTheme: Theme = {
  textColor: 'text-orange-700',
  textColorDark: 'dark:text-orange-300',
  linkColor: 'hover:text-orange-800',
  linkColorDark: 'dark:hover:text-orange-400',
  borderColor: 'border-orange-800',
  borderColorHover: 'hover:border-orange-800',
  borderColorDark: 'dark:border-orange-400',
  borderColorDarkHover: 'dark:hover:border-orange-400',
  bgColor: 'bg-red-300',
  bgColorDark: 'dark:bg-red-900',
};
const fatherTheme: Theme = {
  textColor: 'text-red-200',
  textColorDark: 'dark:text-orange-400',
  linkColor: 'text-orange-100',
  linkColorDark: 'dark:text-orange-500',
  borderColor: 'border-red-100',
  borderColorHover: 'hover:border-red-100',
  borderColorDark: 'dark:border-orange-400',
  borderColorDarkHover: 'dark:hover:border-orange-400',
  bgColor: 'bg-pink-400',
  bgColorDark: 'dark:bg-pink-900',
};
const gardenerTheme: Theme = {
  textColor: 'text-amber-700',
  textColorDark: 'dark:text-amber-300',
  linkColor: 'hover:text-amber-900',
  linkColorDark: 'dark:hover:text-amber-400',
  borderColor: 'border-amber-900',
  borderColorHover: 'hover:border-amber-900',
  borderColorDark: 'hover:border-amber-400',
  borderColorDarkHover: 'dark:hover:border-amber-400',
  bgColor: 'bg-amber-400',
  bgColorDark: 'dark:bg-amber-900',
};

export { baseTheme, fatherTheme, gardenerTheme, husbandTheme };
export type { Theme };
