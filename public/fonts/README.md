# Fonts

The site asks for **McQueen Grotesk** first and falls back to Inter, which is
bundled through `@fontsource-variable/inter`.

McQueen Grotesk is a commercial typeface from Zetafonts and is not bundled in
this repo. Right now it only renders for visitors who happen to have it
installed; everyone else sees Inter.

To serve it to everyone:

1. Buy a webfont licence and export `woff2` files.
2. Save them here as `mcqueen-grotesk-regular.woff2` (400) and
   `mcqueen-grotesk-medium.woff2` (500). Those are the only two weights the
   site uses.
3. Uncomment the `@font-face` block near the top of `src/styles/globals.css`.

Do not commit font files unless the licence allows redistribution in a public
repository.
