import sys, json
sys.path.insert(0, r"c:\Users\屋檐水\Desktop\GitTest\_work")
from cdp import CDP

path = sys.argv[1]
src = open(path, encoding="utf-8").read()
expr = "eval(require('fs').readFileSync(%s, 'utf8'))" % json.dumps(path)
cdp = CDP()
print(cdp.eval(expr, timeout_ms=120000))
