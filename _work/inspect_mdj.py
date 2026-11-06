import json, collections, sys

path = r"c:\Users\屋檐水\Desktop\GitTest\_work\asar\resources\samples\UMLExamples.mdj"
data = json.load(open(path, encoding="utf-8"))
print("root keys:", list(data.keys()))


def walk(elems, depth=0):
    out = []
    for e in elems or []:
        t = e.get("_type")
        views = e.get("ownedViews")
        out.append((t, e.get("name"), len(views) if views is not None else None, e.get("_id")))
        if t and t.endswith("Diagram"):
            pass
        out += walk(e.get("ownedElements"), depth + 1)
    return out


items = walk(data.get("ownedElements"))
for t, name, nv, i in items:
    if t and "Diagram" in t:
        print(f"{t:28s} {str(name)[:36]:36s} views={nv}")


def dump_view(v):
    d = {k: v for k, v in v.items() if k not in ("subViews",)}
    return d


# find a small class diagram
cands = []
def find_diagrams(elems):
    for e in elems or []:
        if e.get("_type") == "UMLClassDiagram":
            cands.append(e)
        find_diagrams(e.get("ownedElements"))


find_diagrams(data.get("ownedElements"))
cands.sort(key=lambda d: len(d.get("ownedViews", [])))
target = cands[0]
print("\n=== smallest class diagram:", target.get("name"), len(target.get("ownedViews", [])))
print(json.dumps(target, ensure_ascii=False, indent=2)[:12000])
