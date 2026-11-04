# American Top Team campaign fonts

These unmodified Latin-subset WOFF2 variable fonts are bundled for
`next/font/local`, so the campaign's production build does not request or
parse Google Fonts CSS. The Buckhead fighter layout reuses this layout.
The existing family choices, CSS variables, normal style, and swap behavior
are retained.

## Sources

Downloaded from Google Fonts on 2026-11-04:

- Montserrat v31: https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2
- DM Sans v17: https://fonts.gstatic.com/s/dmsans/v17/rP2Hp2ywxg089UriCZOIHQ.woff2

The source CSS request was:
https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&family=Montserrat:wght@500..900&display=swap

Montserrat includes its variable weight axis; the campaign exposes weights
500–900. DM Sans includes weight 100–1000 and optical-size 9–40 axes.
Both fonts include the Latin glyphs and punctuation from the previous
Google Fonts Latin subset.

## Licenses

Both families are licensed under SIL Open Font License 1.1. The copyright
notices and complete licenses are retained alongside the fonts:

- `Montserrat-OFL.txt`: https://github.com/google/fonts/blob/main/ofl/montserrat/OFL.txt
- `DM-Sans-OFL.txt`: https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt
