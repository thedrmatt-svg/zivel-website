# Shared Playfair Display and Inter fonts

Unmodified Latin-subset WOFF2 variable fonts downloaded from Google Fonts.
Bundling the files avoids requests to Google Fonts during Next.js builds.
These files include Latin characters and punctuation used in English and
Spanish. Existing font families, CSS variables, normal styles, weight ranges,
preloading, and per-layout `display` behavior are retained. Playfair keeps
its serif fallback.

## Sources

Downloaded on 2026-11-04 using:
https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..700&display=swap

- Inter v20, weight axis 100–900:
  https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2
- Playfair Display v40, with the existing 400–700 weights exposed:
  https://fonts.gstatic.com/s/playfairdisplay/v40/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2

## Licenses

Complete SIL Open Font License 1.1 notices are retained alongside the files:

- `Inter-OFL.txt`: https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt
- `Playfair-Display-OFL.txt`: https://github.com/google/fonts/blob/main/ofl/playfairdisplay/OFL.txt
