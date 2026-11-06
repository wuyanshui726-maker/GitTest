import json

path = r"c:\Users\屋檐水\Desktop\GitTest\_work\asar\resources\samples\UMLExamples.mdj"
data = json.load(open(path, encoding="utf-8"))

diagrams = []
def find(elems):
    for e in elems or []:
        if e.get("_type", "").endswith("Diagram"):
            diagrams.append(e)
        find(e.get("ownedElements"))
find(data.get("ownedElements"))


def collect(d, out):
    for v in d.get("ownedViews", []):
        out.setdefault(v["_type"], []).append((d.get("name"), v))
        collect(v, out)


targets = ["UMLActorView", "UMLUseCaseView", "UMLUseCaseSubjectView",
           "UMLIncludeView", "UMLExtendView", "UMLAttributeView",
           "UMLAssociationView", "UMLGeneralizationView", "UMLDependencyView",
           "UMLSeqLifelineView", "UMLSeqMessageView", "UMLCombinedFragmentView",
           "UMLInteractionOperandView", "UMLPackageView", "UMLInterfaceView"]
found = {}
for d in diagrams:
    col = {}
    collect(d, col)
    for t in targets:
        if t not in found and t in col:
            found[t] = (d.get("name"), col[t][0][1])

for t in targets:
    print("\n" + "=" * 20, t, "from", found.get(t, ("-",))[0], "=" * 20)
    if t in found:
        print(json.dumps(found[t][1], ensure_ascii=False, indent=1)[:9000])
