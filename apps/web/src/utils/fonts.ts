import localFont from 'next/font/local';

export const notoSans = localFont({
  src: '../../public/fonts/NotoSans-VariableFont_wdth,wght.ttf',
  variable: '--font-noto-sans',
  display: 'swap',
});

export const antonFont = localFont({
  src: '../../public/fonts/AntonSC-Regular.ttf',
  display: 'swap',
  variable: '--font-anton',
});
