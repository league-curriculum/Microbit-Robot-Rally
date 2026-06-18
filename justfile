# Micro:bit Robot Rally — curriculum site (Hugo, in site/)
#
# The course site is Hugo. (The old Jekyll site is sequestered in _old/ as
# reference; it is no longer the dev target.)

# Build the 3D Parts section: STL files + PNG previews + content, from the
# Parts Designer bookmarks (tools/render-parts). Slow, so it is NOT run by
# `just dev` — run it on demand; the generated files persist locally.
parts:
    cd tools/render-parts && npm install --no-audit --no-fund --silent && npm run generate

# Run the Hugo dev server with live reload at http://localhost:1313.
# Does NOT regenerate the 3D parts (run `just parts` for that). Override
# baseURL to localhost so dev serves at / (hugo.toml keeps the production
# /Microbit-Robot-Rally/ path for GitHub Pages).
dev:
    hugo server --source site --baseURL http://localhost:1313/ --appendPort=false --navigateToChanged

# Build the static site (regenerates 3D parts first, for a complete site).
build: parts
    curik hugo build

# Remove generated Hugo artifacts (clears stale pages from the dev server)
clean:
    rm -rf site/public site/resources/_gen site/.hugo_build.lock site/static/parts site/content/3d-parts site/data/parts3d.json tools/render-parts/build

# Validate the whole course
validate:
    curik validate course
