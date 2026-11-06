# StarUML 重建实验图 —— 技术笔记与计划

## 目标
把报告 `C:\Users\屋檐水\Desktop\GitTest\2024337621321-周剑-实验一 需求获取与分析.docx` 中的 10 张 PIL 自绘图（`_work\01_usecase.png` … `_work\10_observer.png`）替换为 **StarUML 4.0.1 中真实建模的截图**，并重新生成 Word。
图对应关系：01 用例图；02 购买商品顺序图；03 发布商品顺序图；04 卖家入驻顺序图；05 用户/店铺/商品类图；06 商品类型与动态属性类图；07 购物车/订单/营销类图；08 商品比价类图；09 装饰器模式类图；10 观察者模式类图。

## StarUML 环境事实
- 安装目录 `D:\StarUML-4.0.1`（Electron 应用，主程序 StarUML.exe）。
- **未注册**：`%APPDATA%\StarUML\license.key` 与 `D:\StarUML-4.0.1\license.key` 均不存在。
  因此 `src/engine/diagram-export.js` 的 PNG/SVG/PDF 导出会平铺 "UNREGISTERED" 水印 → **改用界面截图**（截取画布区域，无 watermark）。
- app.asar 已解包到 `_work\asar`（`npx @electron/asar extract`）。
- 可用样例/模板（含完整视图 JSON）：
  - `_work\asar\resources\samples\UMLExamples.mdj`：含 `UMLUseCaseDiagram | Use Case Model`(27 视图)、多个 `UMLClassDiagram`、`UMLSequenceDiagram | submit_comments`(37 视图) 等。
  - `_work\asar\resources\samples\UMLMinimal.mdj`、`templates\UMLConventional.mdj`。
  - `_work\asar\extensions\essential\uml\metamodel.json`、`elements.js`、`uml-factory.js`。
- 视图 JSON 结构（从 UMLExamples.mdj 抽取，样例见 `_work\sample_use.txt`）：
  图 = `{"_type":"UMLUseCaseDiagram","ownedViews":[...]}`；
  视图 = `{"_type":"UMLActorView","_id":..., "_parent":{"$ref":diagramId}, "model":{"$ref":modelId}, "subViews":[UMLNameCompartmentView...], "left","top","width","height"}`；
  `UMLNameCompartmentView` 内含 4 个 `LabelView`（stereotype/name/namespace/property）并通过 `stereotypeLabel/nameLabel/namespaceLabel/propertyLabel` 引用。
- 引擎 API（若走扩展路线）：
  - `app.factory.createModel({id:'UMLClass', parent, field:'ownedElements'})`
  - `app.factory.createDiagram({id:'UMLUseCaseDiagram', parent})`
  - `app.factory.createModelAndView({id, parent, diagram, x1,y1,x2,y2, ...})`（可带 `tailView/headView` 等）
  - `app.engine.addModelAndView(diagram, model, view, field)`
  - 自动布局命令：`format.layout.auto` / command `diagram-layout:auto`（扩展 `_work\asar\extensions\default\diagram-layout`，菜单“格式 > 布局 > 自动”）。
  - 扩展安装目录：`%APPDATA%\StarUML\extensions\<user\>`（本次未验证）。
- 菜单为中文：文件 / 编辑 / 格式 / 模型 / 工具 / 视图 / 窗口 / 调试 / 帮助。

## 已探明的操作经验
- `Start-Process StarUML.exe` 启动的实例会在约 10 秒内退出；改用 PowerShell `& "D:\StarUML-4.0.1\StarUML.exe"` 后台运行可稳定存活（进程名 StarUML，取带 MainWindowTitle 的 PID）。
- computer-use 调用模板：
  ```js
  async function cu(tool_name, args) { return await tools.run_mcp({ server_name: "ide_mcp.config.ext.computer-use", tool_name, args }); }
  const s = await cu("get_app_state", { pid, disableScreenshot: true });
  ```
  注意 pid 会变，每次用 `Get-Process StarUML | Select Id, MainWindowTitle` 重新获取。

## 报告侧信息（已定稿，勿重做）
- 生成脚本 `_work\build_doc.py`（python-docx，模板 `_work\template.docx`）；图为 `_work\0x_*.png`，`add_image(cursor,name,width)` 统一插入；页数 11。
- 输出：根目录 `2024337621321-周剑-实验一 需求获取与分析.docx` 与同名 `.doc`。
- 学号 2024337621321，姓名 周剑；已修排版：图题与图同页、UC-02/UC-03 表格 keep_together、删除重复“2.”标题。
- 现有坐标/元素清单可参考 `_work\make_usecase.py`、`make_sequence.py`、`make_class_a.py`、`make_class_b.py`、`make_patterns.py`（可复用来摆放 StarUML 视图位置或重建同名内容）。

## 待办（按顺序）
1. 决定实现路线：优先「写 StarUML 用户扩展 → 程序化建模+自动布局 → 保存 .mdj → 打开并逐图截图」；失败则退回「用视图模板生成 .mdj」。
2. 逐步替换 `_work\01…10.png`（文件名不变，尺寸按 StarUML 截图裁剪画布区域，去掉网格/选中框；必要时隐藏网格 View->Grid）。
3. `python _work\build_doc.py` 重建，导出 PDF/渲染逐页复核，再另存 `.doc`。
4. 向用户交付并说明：StarUML 4.0.1 未注册，故用界面截图而非导出（导出带水印）。
