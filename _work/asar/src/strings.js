/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/* eslint key-spacing: "off", quotes: "off" */

module.exports = {

  // Menus

  // Menus and Commands
  // File
  "CMD_FILE"                          : "文件",
  "CMD_FILE_NEW"                      : "新建",
  "CMD_FILE_NEW_FROM_TEMPLATE"        : "从模板新建",
  "CMD_FILE_OPEN"                     : "打开...",
  "CMD_FILE_OPEN_RECENT"              : "打开最近的文件",
  "CMD_FILE_SAVE"                     : "保存",
  "CMD_FILE_SAVE_AS"                  : "另存为...",
  "CMD_FILE_IMPORT"                   : "导入",
  "CMD_FILE_IMPORT_FRAGMENT"          : "片段...",
  "CMD_FILE_EXPORT"                   : "导出",
  "CMD_FILE_EXPORT_FRAGMENT"          : "片段...",
  "CMD_FILE_CLOSE"                    : "关闭",
  "CMD_FILE_PREFERENCES"              : "首选项...",
  "CMD_FILE_PRINT_TO_PDF"             : "打印 PDF...",
  "CMD_QUIT"                          : "退出",
  "CMD_EXIT"                          : "退出",
  // Edit
  "CMD_EDIT"                          : "编辑",
  "CMD_EDIT_UNDO"                     : "撤销",
  "CMD_EDIT_REDO"                     : "恢复",
  "CMD_EDIT_CUT"                      : "剪切",
  "CMD_EDIT_COPY"                     : "复制",
  "CMD_EDIT_PASTE"                    : "粘贴",
  "CMD_EDIT_DELETE"                   : "删除",
  "CMD_EDIT_DELETE_FROM_MODEL"        : "从模型删除",
  "CMD_EDIT_MOVE_UP"                  : "向上移动",
  "CMD_EDIT_MOVE_DOWN"                : "向下移动",
  "CMD_EDIT_SELECT_ALL"               : "全选",
  "CMD_EDIT_SELECT_IN_EXPLORER"       : "从管理器选择",
  "CMD_EDIT_SELECT_IN_DIAGRAM"        : "从图选择",
  // Format
  "CMD_FORMAT"                        : "格式",
  "CMD_FORMAT_FONT"                   : "字体...",
  "CMD_FORMAT_FILL_COLOR"             : "填充颜色...",
  "CMD_FORMAT_LINE_COLOR"             : "线条颜色...",
  "CMD_FORMAT_LINE_STYLE"             : "线条样式",
  "CMD_FORMAT_LINE_STYLE_RECTILINEAR" : "直线",
  "CMD_FORMAT_LINE_STYLE_OBLIQUE"     : "斜线",
  "CMD_FORMAT_LINE_STYLE_ROUNDRECT"   : "圆角",
  "CMD_FORMAT_LINE_STYLE_CURVE"       : "曲线",

  "CMD_FORMAT_AUTO_RESIZE"            : "自动调整大小",
  "CMD_FORMAT_SHOW_SHADOW"            : "显示阴影",
  // Model
  "CMD_MODEL"                         : "模型",
  // Tools
  "CMD_TOOLS"                         : "工具",
  "CMD_TOOLS_EXTENSION_MANAGER"       : "扩展管理...",
  // View
  "CMD_VIEW"                          : "视图",
  "CMD_VIEW_CLOSE_DIAGRAM"            : "关闭图",
  "CMD_VIEW_CLOSE_OTHER_DIAGRAMS"     : "关闭其他图",
  "CMD_VIEW_CLOSE_ALL_DIAGRAMS"       : "关闭所有图",
  "CMD_VIEW_NEXT_DIAGRAM"             : "下一个图",
  "CMD_VIEW_PREVIOUS_DIAGRAM"         : "上一个图",
  "CMD_VIEW_ZOOM_IN"                  : "放大",
  "CMD_VIEW_ZOOM_OUT"                 : "缩小",
  "CMD_VIEW_ACTUAL_SIZE"              : "实际大小",
  "CMD_VIEW_FIT_TO_WINDOW"            : "适合窗口",
  "CMD_VIEW_SHOW_GRID"                : "显示网格",
  "CMD_VIEW_SHOW_SIDEBAR"             : "显示侧边栏",
  "CMD_VIEW_HIDE_SIDEBAR"             : "隐藏侧边栏",
  "CMD_VIEW_SHOW_NAVIGATOR"           : "显示导航栏",
  "CMD_VIEW_HIDE_NAVIGATOR"           : "隐藏导航栏",
  "CMD_VIEW_SHOW_TOOLBAR"             : "显示工具条",
  "CMD_VIEW_HIDE_TOOLBAR"             : "隐藏工具条",
  "CMD_VIEW_SHOW_STATUSBAR"           : "显示状态条",
  "CMD_VIEW_HIDE_STATUSBAR"           : "隐藏状态条",
  "CMD_VIEW_SHOW_TOOLBOX"             : "显示工具箱",
  "CMD_VIEW_HIDE_TOOLBOX"             : "隐藏工具箱",
  "CMD_VIEW_SHOW_EDITORS"             : "显示编辑器",
  "CMD_VIEW_HIDE_EDITORS"             : "隐藏编辑器",
  // Help
  "CMD_HELP"                          : "帮助",
  "CMD_HELP_ABOUT"                    : "关于 StarUML",
  "CMD_HELP_CHECK_FOR_UPDATES"        : "检查更新s...",
  "CMD_HELP_ENTER_LICENSE"            : "输入许可证...",
  "CMD_HELP_DOCUMENTATION"            : "文档",
  "CMD_HELP_FORUM"                    : "论坛",
  "CMD_HELP_RELEASE_NOTE"             : "发行说明",
  "CMD_HELP_REQUEST_FEATURE"          : "功能特性",

  // UML Commands
  /* File: New From Template */
  "CMD_FILE_NEW_FROM_TEMPLATE_UML_MINIMAL"      : "最小 UML",
  "CMD_FILE_NEW_FROM_TEMPLATE_UML_CONVENTIONAL" : "常规 UML",
  "CMD_FILE_NEW_FROM_TEMPLATE_4P1VIEWMODEL"     : "4+1视图模型",
  "CMD_FILE_NEW_FROM_TEMPLATE_RATIONAL"         : "Rational",
  // Model: Profiles
  "CMD_MODEL_APPLY_PROFILE"                  : "同意配置",
  "CMD_MODEL_APPLY_PROFILE_UML_STANDARD"     : "UML 标准配置 (v2)",
  // Model Add
  "CMD_MODEL_ADD"                            : "添加",
  "CMD_MODEL_ADD_DIAGRAM"                    : "添加图",
  // Model: Packages
  "CMD_MODEL_ADD_MODEL"                      : "模型",
  "CMD_MODEL_ADD_SUBSYSTEM"                  : "子系统",
  "CMD_MODEL_ADD_PACKAGE"                    : "包",
  "CMD_MODEL_ADD_PROFILE"                    : "配置",
  // Model: Classes
  "CMD_MODEL_ADD_CLASS"                      : "类",
  "CMD_MODEL_ADD_INTERFACE"                  : "接口",
  "CMD_MODEL_ADD_SIGNAL"                     : "信号",
  "CMD_MODEL_ADD_DATATYPE"                   : "数据类型",
  "CMD_MODEL_ADD_PRIMITIVETYPE"              : "原始类型",
  "CMD_MODEL_ADD_ENUMERATION"                : "枚举",
  "CMD_MODEL_ADD_ARTIFACT"                   : "工件",
  "CMD_MODEL_ADD_COMPONENT"                  : "组件",
  "CMD_MODEL_ADD_NODE"                       : "节点",
  "CMD_MODEL_ADD_USECASE"                    : "用例",
  "CMD_MODEL_ADD_ACTOR"                      : "参与者",
  "CMD_MODEL_ADD_STEREOTYPE"                 : "构造型",
  // Model: Instances
  "CMD_MODEL_ADD_OBJECT"                     : "对象",
  "CMD_MODEL_ADD_ARTIFACTINSTANCE"           : "工件实例",
  "CMD_MODEL_ADD_COMPONENTINSTANCE"          : "组件实例",
  "CMD_MODEL_ADD_NODEINSTANCE"               : "节点实例",
  // Model: Behaviors
  "CMD_MODEL_ADD_COLLABORATION"              : "协作",
  "CMD_MODEL_ADD_INTERACTION"                : "交互",
  "CMD_MODEL_ADD_STATEMACHINE"               : "状态机",
  "CMD_MODEL_ADD_ACTIVITY"                   : "活动",
  "CMD_MODEL_ADD_OPAQUEBEHAVIOR"             : "模糊行为",
  // Model: Features
  "CMD_MODEL_ADD_TEMPLATEPARAMETER"          : "模板参数",
  "CMD_MODEL_ADD_PARAMETER"                  : "参数",
  "CMD_MODEL_ADD_ENUMERATIONLITERAL"         : "枚举标量",
  "CMD_MODEL_ADD_ATTRIBUTE"                  : "属性",
  "CMD_MODEL_ADD_PORT"                       : "端口",
  "CMD_MODEL_ADD_OPERATION"                  : "操作",
  "CMD_MODEL_ADD_RECEPTION"                  : "接收",
  "CMD_MODEL_ADD_EXTENSIONPOINT"             : "扩展点",
  "CMD_MODEL_ADD_SLOT"                       : "插槽",
  // Model: States
  "CMD_MODEL_ADD_STATE"                      : "状态",
  "CMD_MODEL_ADD_REGION"                     : "区域",
  "CMD_MODEL_ADD_ENTRY_ACTIVITY"             : "进入活动",
  "CMD_MODEL_ADD_DO_ACTIVITY"                : "进行活动",
  "CMD_MODEL_ADD_EXIT_ACTIVITY"              : "退出活动",
  "CMD_MODEL_ADD_TRIGGER"                    : "触发器",
  "CMD_MODEL_ADD_EFFECT"                     : "效果",
  // Model: Actions
  "CMD_MODEL_ADD_ACTION"                     : "动作",
  // Model: Common
  "CMD_MODEL_ADD_CONSTRAINT"                 : "约束",
  "CMD_MODEL_ADD_TAG"                        : "标签",
  // Model: Diagrams
  "CMD_MODEL_ADD_DIAGRAM_CLASS"              : "类图",
  "CMD_MODEL_ADD_DIAGRAM_PACKAGE"            : "包图",
  "CMD_MODEL_ADD_DIAGRAM_OBJECT"             : "对象图",
  "CMD_MODEL_ADD_DIAGRAM_COMPOSITESTRUCTURE" : "复合结构图",
  "CMD_MODEL_ADD_DIAGRAM_COMPONENT"          : "组件图",
  "CMD_MODEL_ADD_DIAGRAM_DEPLOYMENT"         : "部署图",
  "CMD_MODEL_ADD_DIAGRAM_USECASE"            : "用例图",
  "CMD_MODEL_ADD_DIAGRAM_SEQUENCE"           : "序列图",
  "CMD_MODEL_ADD_DIAGRAM_COMMUNICATION"      : "通讯图",
  "CMD_MODEL_ADD_DIAGRAM_STATECHART"         : "状态图",
  "CMD_MODEL_ADD_DIAGRAM_ACTIVITY"           : "活动图",
  "CMD_MODEL_ADD_DIAGRAM_PROFILE"            : "配置图",
  // Format
  "CMD_FORMAT_STEREOTYPE"                    : "构造型显示",
  "CMD_FORMAT_STEREOTYPE_NONE"               : "不显示",
  "CMD_FORMAT_STEREOTYPE_LABEL"              : "标签",
  "CMD_FORMAT_STEREOTYPE_DECORATION"         : "装饰",
  "CMD_FORMAT_STEREOTYPE_DECORATION_LABEL"   : "带标签的装饰",
  "CMD_FORMAT_STEREOTYPE_ICON"               : "图标",
  "CMD_FORMAT_STEREOTYPE_ICON_LABEL"         : "带标签的图标",
  "CMD_FORMAT_WORD_WRAP"                     : "自动换行",
  "CMD_FORMAT_SHOW_VISIBILITY"               : "显示可见性",
  "CMD_FORMAT_SHOW_NAMESPACE"                : "显示命名空间",
  "CMD_FORMAT_SHOW_PROPERTY"                 : "显示属性",
  "CMD_FORMAT_SHOW_TYPE"                     : "显示类型",
  "CMD_FORMAT_SHOW_MULTIPLICITY"             : "显示多样性",
  "CMD_FORMAT_SHOW_OPERATION_SIGNATURE"      : "显示操作签名",
  "CMD_FORMAT_SUPPRESS_ATTRIBUTES"           : "抑制属性",
  "CMD_FORMAT_SUPPRESS_OPERATIONS"           : "抑制操作",
  "CMD_FORMAT_SUPPRESS_RECEPTIONS"           : "抑制接收",
  "CMD_FORMAT_SUPPRESS_LITERALS"             : "抑制标量",

  // Extension Manager
  "EXTENSION_NOT_INSTALLED"              : "无法删除扩展程序 {0}，因为它没有安装",
  "CANT_UPDATE"                          : "此更新与此版本的 StarUML 不兼容",
  "CANT_UPDATE_DEV"                      : "\"dev\" 文件夹中的扩展不能自动更新。",
  "INSTALL"                              : "安装",
  "UPDATE"                               : "更新",
  "REMOVE"                               : "移除",
  "OVERWRITE"                            : "覆盖",
  "RELOAD"                               : "重新加载",
  "EXTENSION_MANAGER_ERROR_LOAD"         : "无法访问扩展注册表，请稍后再试",
  "EXTENSION_INCOMPATIBLE_NEWER"         : "此扩展需要更新版本的 StarUML",
  "EXTENSION_INCOMPATIBLE_OLDER"         : "此扩展目前仅适用于旧版本的 StarUML",
  "EXTENSION_LATEST_INCOMPATIBLE_NEWER"  : "此扩展的 {0} 版本需要更新版本的 StarUML，但是您可以安装较早的版本 {1}",
  "EXTENSION_LATEST_INCOMPATIBLE_OLDER"  : "此扩展的 {0} 版本仅适用于旧版本的 StarUML，但是您可以安装较早的版本 {1}",
  "EXTENSION_NO_DESCRIPTION"             : "无描述",
  "EXTENSION_ISSUES"                     : "问题",
  "EXTENSION_MORE_INFO"                  : "更多信息...",
  "EXTENSION_ERROR"                      : "扩展错误",
  "EXTENSION_KEYWORDS"                   : "关键字",
  "EXTENSION_INSTALLED"                  : "已安装",
  "EXTENSION_UPDATE_INSTALLED"           : "此扩展更新已下载并将在 StarUML 重新加载后安装",
  "EXTENSION_MANAGER_REMOVE"             : "移除扩展",
  "EXTENSION_MANAGER_REMOVE_ERROR"       : "无法移除一个或多个扩展: {0}, StarUML 仍将重新加载",
  "EXTENSION_MANAGER_UPDATE"             : "更新扩展",
  "EXTENSION_MANAGER_UPDATE_ERROR"       : "无法更新一个或多个扩展: {0}, StarUML 仍将重新加载",
  "MARKED_FOR_REMOVAL"                   : "标记为移除",
  "UNDO_REMOVE"                          : "撤消",
  "MARKED_FOR_UPDATE"                    : "标记为更新",
  "UNDO_UPDATE"                          : "撤销",
  "CHANGE_AND_RELOAD_TITLE"              : "更改扩展",
  "CHANGE_AND_RELOAD_MESSAGE"            : "要更新或移除标记的扩展, StarUML 需要重新加载, 系统会提示您保存未保存的更改",
  "REMOVE_AND_RELOAD"                    : "移除扩展并重新加载",
  "CHANGE_AND_RELOAD"                    : "更改扩展并重新加载",
  "UPDATE_AND_RELOAD"                    : "更新扩展并重新加载",
  "PROCESSING_EXTENSIONS"                : "处理扩展更改\u2026",
  "NO_EXTENSIONS"                        : "尚未安装任何扩展程序<br>单击上方的“注册表”选项卡即可开始使用",
  "NO_EXTENSION_MATCHES"                 : "没有扩展符合您的搜索条件",
  "REGISTRY_SANITY_CHECK_WARNING"        : "从未知来源安装扩展时要小心",
  "UNKNOWN_ERROR"                        : "未知的内部错误",

  // Install Extension Dialog
  "INSTALL_EXTENSION_TITLE"              : "安装扩展",
  "UPDATE_EXTENSION_TITLE"               : "更新扩展",
  "INSTALLING_FROM"                      : "安装扩展从 {0}\u2026",
  "INSTALL_SUCCEEDED"                    : "安装成功!",
  "INSTALL_FAILED"                       : "安装失败.",
  "INSTALL_CANCELED"                     : "安装取消.",
  "CANCELING_INSTALL"                    : "取消中\u2026",
  "CANCELING_HUNG"                       : "取消安装需要很长时间，可能发生了内部错误",

  // Dialogs
  "SAVE_CHANGES"                         : "保存更改",
  "SAVE_CHANGES_MESSAGE"                 : "是否要保存所做的更改?",
  "SELECT_MODEL_FILE"                    : "选择模型文件...",
  "SELECT_MODEL_FRAGMENT_FILE"           : "选择要导入的模型片段...",
  "SELECT_ELEMENT_TO_EXPORT"             : "选择要导出的元素...",
  "EXPORT_MODEL_FRAGMENT"                : "导出模型片段",

  // Dialog Buttons
  "OK"                                   : "确认",
  "CANCEL"                               : "取消",
  "SAVE"                                 : "保存",
  "DONTSAVE"                             : "不保存",
  "CLOSE"                                : "关闭",
  "INSTALL_AND_RESTART"                  : "安装并重启",

  // Settings for Explorer
  "EXPLORER_SETTINGS_SORT_BY_ADDED"      : "按添加排序",
  "EXPLORER_SETTINGS_SORT_BY_NAME"       : "按名称排序",
  "EXPLORER_SETTINGS_SHOW_STEREOTYPE_TEXT" : "显示构造型文本",

  // Keyboard modifier names
  "KEYBOARD_CTRL"   : "Ctrl",
  "KEYBOARD_SHIFT"  : "Shift",
  "KEYBOARD_SPACE"  : "Space"

}
