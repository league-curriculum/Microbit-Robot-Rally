# Micro:bit Robot Rally — curriculum site (Hugo, in site/)
#
# The course site is Hugo. (The old Jekyll site is sequestered in _old/ as
# reference; it is no longer the dev target.)

# Run the Hugo dev server with live reload at http://localhost:1313
# Override baseURL to localhost so dev serves at / (hugo.toml keeps the
# production /Microbit-Robot-Rally/ path for GitHub Pages).
dev:
    hugo server --source site --baseURL http://localhost:1313/ --appendPort=false --navigateToChanged

# Build the static site via curik (outputs to site/public)
build:
    curik hugo build

# Remove generated Hugo artifacts (clears stale pages from the dev server)
clean:
    rm -rf site/public site/resources/_gen site/.hugo_build.lock

# Validate the whole course
validate:
    curik validate course
