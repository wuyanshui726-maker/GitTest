import json, urllib.request, base64, sys, time
import websocket


def targets():
    return json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json/list").read())


class CDP:
    def __init__(self):
        t = [x for x in targets() if x["type"] == "page"][0]
        self.ws = websocket.create_connection(t["webSocketDebuggerUrl"], timeout=60)
        self.id = 0

    def call(self, method, params=None):
        self.id += 1
        msg = {"id": self.id, "method": method, "params": params or {}}
        self.ws.send(json.dumps(msg))
        while True:
            data = json.loads(self.ws.recv())
            if data.get("id") == self.id:
                if "error" in data:
                    raise RuntimeError(json.dumps(data["error"], ensure_ascii=False))
                return data.get("result", {})

    def eval(self, expr, timeout_ms=60000):
        r = self.call("Runtime.evaluate", {
            "expression": expr,
            "returnByValue": True,
            "awaitPromise": True,
            "timeout": timeout_ms,
        })
        if "exceptionDetails" in r:
            raise RuntimeError(json.dumps(r["exceptionDetails"], ensure_ascii=False)[:2000])
        return r.get("result", {}).get("value")

    def shot(self, path):
        r = self.call("Page.captureScreenshot", {"format": "png"})
        with open(path, "wb") as f:
            f.write(base64.b64decode(r["data"]))


if __name__ == "__main__":
    cdp = CDP()
    print(cdp.eval(sys.argv[1] if len(sys.argv) > 1 else "1+1"))
