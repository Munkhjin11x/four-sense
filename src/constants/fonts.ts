import localFont from 'next/font/local';

const fonts = localFont({
  src: [
    {
      path: '../fonts/gip-font/GIP-Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-UltraLight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../fonts/gip-font/GIP-ExtraBold.otf',
      weight: '800',
      style: 'normal'
    },
    // {
    //   path:'../fonts/roba/BlackTRIAL.otf'
    // },
    {
      path: '../fonts/gip-font/GIP-Black.otf',
      weight: '900',
      style: 'normal'
    },

  ]
});

export default fonts;
