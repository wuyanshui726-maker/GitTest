import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from umlcore import Fig
from classdraw import class_box, connect, mult_at, role

OUT = os.path.dirname(__file__)

# ============ 装饰器模式（门） ============
f = Fig(1200, 745)
Door = class_box(f, 440, 40, 400, "门 Door", [], ["+ open()", "+ close()"], stereo="«interface»")
Simple = class_box(f, 60, 300, 320, "普通门 SimpleDoor", [], ["+ open()", "+ close()"])
Deco = class_box(f, 440, 300, 400, "门装饰器 DoorDecorator",
                 ["- decoratedDoor: Door"], ["+ open()", "+ close()"])
Lock = class_box(f, 60, 560, 320, "门锁装饰 LockDecorator", [], ["+ open()", "+ close()"])
Bell = class_box(f, 440, 560, 320, "门铃装饰 BellDecorator", [], ["+ open()", "+ close()"])
Couplet = class_box(f, 820, 560, 340, "对联装饰 CoupletDecorator", [], ["+ open()", "+ close()"])

connect(f, Simple, Door, "inherit")
connect(f, Deco, Door, "inherit")
connect(f, Lock, Deco, "inherit")
connect(f, Bell, Deco, "inherit")
connect(f, Couplet, Deco, "inherit")

# 装饰器组合一个被装饰的门
connect(f, Deco, Door, "comp", route=[(900, 420), (900, 115)])
mult_at(f, (872, 400), "1")
mult_at(f, (872, 88), "1")
f.save(os.path.join(OUT, "09_decorator.png"))

# ============ 观察者模式（邮箱） ============
f = Fig(1500, 640)
Mail = class_box(f, 80, 40, 400, "邮箱 MailBox",
                 ["- observers: List<Observer>"],
                 ["+ attach(o: Observer)", "+ detach(o: Observer)", "+ notify()"])
Obs = class_box(f, 780, 40, 360, "观察者 Observer", [], ["+ update(mail: Mail)"], stereo="«interface»")
QQ = class_box(f, 470, 460, 320, "QQ 通知器 QQNotifier", [], ["+ update(mail: Mail)"])
Sms = class_box(f, 820, 460, 320, "短信通知器 SmsNotifier", [], ["+ update(mail: Mail)"])
App = class_box(f, 1160, 460, 320, "APP 通知器 AppNotifier", [], ["+ update(mail: Mail)"])

connect(f, Mail, Obs, "assoc")
mult_at(f, (520, 105), "1")
mult_at(f, (748, 85), "*")
role(f, (640, 158), "observers")

connect(f, QQ, Obs, "inherit")
connect(f, Sms, Obs, "inherit")
connect(f, App, Obs, "inherit")
f.save(os.path.join(OUT, "10_observer.png"))
print("patterns done")
