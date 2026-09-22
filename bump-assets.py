# -*- coding: utf-8 -*-
"""Cache-busting: stamp every local CSS/JS reference in the HTML pages with ?v=<timestamp>.

Run before each deploy (python bump-assets.py). Browsers then re-download styles
and scripts whenever the site changes; without it, a cached script.js can overwrite
fresh HTML text with its old i18n dictionary on page load.
"""
import io, glob, re, time, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
version = time.strftime("%Y%m%d%H%M")
pattern = re.compile(r'((?:href|src)="(?:styles\.css|[a-z]+\.js))(?:\?v=\d+)?(")')

for page in sorted(glob.glob("*.html")):
    html = io.open(page, encoding="utf-8").read()
    stamped, n = pattern.subn(r"\1?v=" + version + r"\2", html)
    if n:
        io.open(page, "w", encoding="utf-8").write(stamped)
    print("%-15s %d asset refs -> v=%s" % (page, n, version))
