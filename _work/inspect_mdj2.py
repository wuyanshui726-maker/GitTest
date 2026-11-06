import json, collections

path = r"c:\Users\屋檐水\Desktop\GitTest\_work\asar\resources\samples\UMLExamples.mdj"
data = json.load(open(path, encoding="utf-8"))

diagrams = []
def find(elems):
    for e in elems or []:
        if e.get("_type", "").endswith("Diagram"):
            diagrams.append(e)
        find(e.get("ownedElements"))
find(data.get("ownedElements"))


def collect_views(d, out, depth=0):
    for v in d.get("ownedViews", []):
        out.setdefault(v["_type"], []).append((d.get("name"), depth, v))
        collect_views(v, out, depth + 1)


def strip(v, keep_children=True):
    o = {}
    for k, val in v.items():
        if k == "subViews" and not keep_children:
            continue
        if isinstance(val, dict) and "$ref" in val:
            o[k] = val
        elif k == "subViews":
            o[k] = [strip(c, True) for c in val]
        else:
            o[k] = val
    return o


want = {
    "UMLActorView": 1, "UMLUseCaseView": 1, "UMLUseCaseSubjectView": 1,
    "UMLIncludeView": 1, "UMLExtendView": 1,
    "UMLClassView": 1, "UMLAttributeView": 1, "UMLOperationView": 1,
    "UMLAssociationView": 1, "UMLGeneralizationView": 1, "UMLDependencyView": 1,
    "UMLPackageView": 1, "UMLInterfaceView": 1, "UMLEnumerationView": 1,
    "UMLObjectView": 0, "UMLActivationView": 0, "UMLMessageView": 0,
    "UMLSeqStimulusView": 0,
}
all_types = collections.Counter()

for d in diagrams:
    col = {}
    collect_views(d, col)
    for t, arr in col.items():
        all_types[t] += 0
    for t in want:
        if t in col and want[t]:
            name, depth, v = col[t][0]
            all_types[t] += 1

print("== view types present in sample ==")
seen = set()
for d in diagrams:
    col = {}
    collect_views(d, col)
    seen |= set(col)
for t in sorted(seen):
    print(t)
