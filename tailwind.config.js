/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}","./index.html"],
  theme: {
    extend: {
      "boxShadow": {
        "custom-drawer": "-6px 0 16px 0 rgba(0, 0, 0, 0.08),-3px 0 6px -4px rgba(0, 0, 0, 0.12),-9px 0 28px 8px rgba(0, 0, 0, 0.05)",
        "custom-title": "0px 2px 6px rgba(16, 24, 40, 0.06)"
      }, 
      "backgroundColor": {
        "sunken": "#F4F6F9",
        "black-12": "rgba(0, 0, 0, 0.12)",
      },
      boxShadow: {
        'custom-shadow': `
          0px 0px 1px 0px var(--shadow-border-color, rgba(0, 0, 0, 0.16)),
          0px 4px 16px -6px var(--1-shadow-color-middle-1, rgba(0, 0, 0, 0.12)),
          0px 6px 20px 2px var(--2-shadow-color-middle-2, rgba(0, 0, 0, 0.08))
        `,
      },
      animation: {
        'text-gradient': 'text-gradient 3s linear infinite',
      },
      keyframes: {
        'text-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #003FFB, #5400FB, #003FFB)',
      },
      typography: {
        DEFAULT: {
          css: {
            // h4: {
            //   fontWeight: '600',
            //   color: 'red',
            // }
          },
        },
        customProse: {
          css: {
            h1: {
              color: 'red',
            }
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

