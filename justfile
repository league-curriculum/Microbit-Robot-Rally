# Pin Homebrew Ruby 3.3 for all recipes, so they don't depend on the shell's
# PATH or on which `ruby` happens to be linked. Jekyll 3.10 / github-pages
# needs Ruby 3.x; system Ruby 2.6 and Homebrew Ruby 4.0 both fail.
export PATH := "/opt/homebrew/opt/ruby@3.3/bin:" + env_var('PATH')

# Install gem dependencies (bootstraps the locked bundler if needed)
install:
    gem install bundler:2.6.9 --conservative
    bundle install

# Run the Jekyll dev server with live reload at http://localhost:4000
dev: install
    bundle exec jekyll serve --livereload
