/*
 * Copyright (c) 2014 MKLab. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the 'Software'),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

const _ = require('lodash')

rules.push(
  {
    id: 'UML001',
    message: '预期名称',
    appliesTo: [ 'UMLModelElement' ],
    exceptions: [ 'UMLDirectedRelationship', 'UMLRelationshipEnd', 'UMLUndirectedRelationship', 'UMLAssociationClassLink', 'UMLRegion', 'UMLPseudostate', 'UMLFinalState', 'UMLControlNode', 'UMLEndpoint', 'UMLGate', 'UMLImage', 'UMLLifeline', 'UMLInstance' ],
    constraint: function (elem) {
      if (elem instanceof type.UMLParameter) {
        return (elem.direction === 'return' ? true : elem.name.length > 0)
      } else {
        return (elem.name.length > 0)
      }
    }
  }
)

rules.push(
  {
    id: 'UML002',
    message: '名称已经定义',
    appliesTo: [ 'UMLModelElement' ],
    exceptions: [ 'UMLOperation', 'UMLActivityEdgeConnector' ],
    constraint: function (elem) {
      var parent = elem._parent
      var field = elem.getParentField()
      var siblings = parent[field]
      var i, len
      for (i = 0, len = siblings.length; i < len; i++) {
        var sibling = siblings[i]
        if (elem !== sibling && elem.name.length > 0 && elem.name === sibling.name) {
          return false
        }
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML003',
    message: '与继承的属性冲突',
    appliesTo: [ 'UMLAttribute' ],
    constraint: function (elem) {
      if (elem._parent instanceof type.UMLClassifier) {
        var inherited = elem._parent.getInheritedAttributes()
        var names = _.map(inherited, e => { return e.name })
        return !_.includes(names, elem.name)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML004',
    message: '签名冲突',
    appliesTo: [ 'UMLOperation' ],
    constraint: function (elem) {
      var options = {
        stereotypeDisplay: 'none',
        showVisibility: false,
        showProperty: false,
        showType: true,
        showOperationSignature: true
      }
      var signature = elem.getString(options)
      if (elem._parent.operations) {
        var i, len
        for (i = 0, len = elem._parent.operations.length; i < len; i++) {
          var op = elem._parent.operations[i]
          var sig = op.getString(options)
          if (op !== elem && sig === signature) {
            return false
          }
        }
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML006',
    message: '最终元素和叶子元素不得有子元素',
    appliesTo: [ 'UMLClassifier' ],
    constraint: function (elem) {
      if (elem.isFinalSpecialization === true || elem.isLeaf === true) {
        var subs = elem.getSpecialElements()
        return (subs.length === 0)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML007',
    message: '重复的泛化',
    appliesTo: [ 'UMLClassifier' ],
    constraint: function (elem) {
      var gens = elem.getGeneralElements()
      return (gens.length === _.uniq(gens).length)
    }
  }
)

rules.push(
  {
    id: 'UML008',
    message: '循环的泛化',
    appliesTo: [ 'UMLClassifier' ],
    constraint: function (elem) {
      var ancestors = elem.getAncestors()
      return (!_.includes(ancestors, elem))
    }
  }
)

rules.push(
  {
    id: 'UML009',
    message: '重复的实现',
    appliesTo: [ 'UMLClassifier' ],
    constraint: function (elem) {
      var reals = elem.getInterfaces()
      return (reals.length === _.uniq(reals).length)
    }
  }
)

rules.push(
  {
    id: 'UML010',
    message: '关联分类器角色名称重复',
    appliesTo: [ 'UMLClassifier' ],
    constraint: function (elem) {
      var ends = elem.getAssociationEnds(true) // get counterpart ends.
      var names = []
      _.each(ends, e => {
        if (e.navigable && e.name) {
          names.push(e.name)
        }
      })
      _.map(ends, e => { return e.name })
      return (names.length === _.uniq(names).length)
    }
  }
)

rules.push(
  {
    id: 'UML011',
    message: '接口的所有属性和操作都必须是公共的',
    appliesTo: [ 'UMLInterface' ],
    constraint: function (elem) {
      function bePublic (e) {
        return e.visibility === 'public'
      }
      return _.every(elem.attributes, bePublic) && _.every(elem.operations, bePublic)
    }
  }
)

rules.push(
  {
    id: 'UML012',
    message: '聚合必须是关联中的一个',
    appliesTo: [ 'UMLAssociation' ],
    constraint: function (elem) {
      function isAggregation (e) {
        return e.aggregation === 'shared' || e.aggregation === 'composite'
      }
      return !(isAggregation(elem.end1) && isAggregation(elem.end2))
    }
  }
)

rules.push(
  {
    id: 'UML013',
    message: '工件实例的类型必须是工件',
    appliesTo: [ 'UMLArtifactInstance' ],
    constraint: function (elem) {
      return (!elem.classifier || elem.classifier instanceof type.UMLArtifact)
    }
  }
)

rules.push(
  {
    id: 'UML014',
    message: '组件实例的类型必须是组件',
    appliesTo: [ 'UMLComponentInstance' ],
    constraint: function (elem) {
      return (!elem.classifier || elem.classifier instanceof type.UMLComponent)
    }
  }
)

rules.push(
  {
    id: 'UML015',
    message: '节点实例的类型必须是节点',
    appliesTo: [ 'UMLNodeInstance' ],
    constraint: function (elem) {
      return (!elem.classifier || elem.classifier instanceof type.UMLNode)
    }
  }
)

rules.push(
  {
    id: 'UML016',
    message: '元类必须在元模型中定义名称',
    appliesTo: [ 'UMLMetaClass' ],
    constraint: function (elem) {
      return (meta[elem.name])
    }
  }
)

rules.push(
  {
    id: 'UML017',
    message: '构造型必须从构造型继承',
    appliesTo: [ 'UMLStereotype' ],
    constraint: function (elem) {
      var gens = elem.getGeneralElements()
      return _.every(gens, function (g) { return (g instanceof type.UMLStereotype) })
    }
  }
)

rules.push(
  {
    id: 'UML018',
    message: '配置必须包含构造型',
    appliesTo: [ 'UMLStereotype' ],
    constraint: function (elem) {
      var found = false
      elem.traverseUp(function (e) {
        if (e instanceof type.UMLProfile) { found = true }
      })
      return found
    }
  }
)

rules.push(
  {
    id: 'UML019',
    message: '参与者只能与用例、组件和类相关联',
    appliesTo: [ 'UMLActor' ],
    constraint: function (elem) {
      var ends = elem.getAssociationEnds(true)
      return _.every(ends, function (e) {
        return (e.reference instanceof type.UMLUseCase) ||
        (e.reference instanceof type.UMLComponent) ||
        (e.reference instanceof type.UMLClass)
      })
    }
  }
)

rules.push(
  {
    id: 'UML020',
    message: '用例不能包括直接或间接包含它的用例',
    appliesTo: [ 'UMLUseCase' ],
    constraint: function (elem) {
      var includings = elem.getAllIncludedUseCases()
      return (!_.includes(includings, elem))
    }
  }
)

rules.push(
  {
    id: 'UML021',
    message: '一个初始点最多可以有一个传出转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'initial') {
        return (elem.getOutgoingTransitions().length <= 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML022',
    message: '从初始点传出的转换不能有触发器或守卫',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'initial') {
        var outs = elem.getOutgoingTransitions()
        return _.every(outs, function (t) {
          return (t.triggers.length === 0) && (!t.guard)
        })
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML023',
    message: '历史点最多可以有一个传出转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'deepHistory' || elem.kind === 'shallowHistory') {
        return (elem.getOutgoingTransitions().length <= 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML024',
    message: '一个连接点必须至少有两个传入转换和一个传出转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'join') {
        return (elem.getIncomingTransitions().length >= 2) &&
        (elem.getOutgoingTransitions().length === 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML025',
    message: '一个分支点必须至少有两个传出转换和一个传入转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'fork') {
        return (elem.getOutgoingTransitions().length >= 2) &&
        (elem.getIncomingTransitions().length === 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML026',
    message: '一个连接点必须至少有一个传入和一个传出转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'junction') {
        return (elem.getOutgoingTransitions().length >= 1) &&
        (elem.getIncomingTransitions().length >= 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML027',
    message: '一个决策点必须至少有一个传入和一个传出转换',
    appliesTo: [ 'UMLPseudostate' ],
    constraint: function (elem) {
      if (elem.kind === 'choice') {
        return (elem.getOutgoingTransitions().length >= 1) &&
        (elem.getIncomingTransitions().length === 1)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML028',
    message: '只有子状态机可以有连接点参考',
    appliesTo: [ 'UMLState' ],
    constraint: function (elem) {
      if (elem.connections.length > 0) {
        return (elem.submachine instanceof type.UMLStateMachine)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML029',
    message: '一个状态不允许同时拥有子状态机和区域',
    appliesTo: [ 'UMLState' ],
    constraint: function (elem) {
      return !(elem.regions.length > 0 && elem.submachine instanceof type.UMLStateMachine)
    }
  }
)

rules.push(
  {
    id: 'UML030',
    message: '一个区域最多可以有一个初始点',
    appliesTo: [ 'UMLRegion' ],
    constraint: function (elem) {
      var vs = _.filter(elem.vertices, function (v) {
        return (v instanceof type.UMLPseudostate) && (v.kind === 'initial')
      })
      return vs.length <= 1
    }
  }
)

rules.push(
  {
    id: 'UML031',
    message: '一个区域最多可以有一个深历史点',
    appliesTo: [ 'UMLRegion' ],
    constraint: function (elem) {
      var vs = _.filter(elem.vertices, function (v) {
        return (v instanceof type.UMLPseudostate) && (v.kind === 'deepHistory')
      })
      return vs.length <= 1
    }
  }
)

rules.push(
  {
    id: 'UML032',
    message: '一个区域最多可以有一个浅历史点',
    appliesTo: [ 'UMLRegion' ],
    constraint: function (elem) {
      var vs = _.filter(elem.vertices, function (v) {
        return (v instanceof type.UMLPseudostate) && (v.kind === 'shallowHistory')
      })
      return vs.length <= 1
    }
  }
)

rules.push(
  {
    id: 'UML033',
    message: '最终状态不能有任何传出转换',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (elem.getOutgoingTransitions().length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML034',
    message: '最终状态不能有区域',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (elem.regions.length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML035',
    message: '最终状态不能引用子状态机',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (!elem.submachine)
    }
  }
)

rules.push(
  {
    id: 'UML036',
    message: '最终状态没有进入行为',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (elem.entryActivities.length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML037',
    message: '最终状态没有退出行为',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (elem.exitActivities.length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML038',
    message: '最终状态没有进行行为。',
    appliesTo: [ 'UMLFinalState' ],
    constraint: function (elem) {
      return (elem.doActivities.length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML039',
    message: '分支不能有守卫或触发器',
    appliesTo: [ 'UMLTransition' ],
    constraint: function (elem) {
      if (elem.source instanceof type.UMLPseudostate && elem.source.kind === 'fork') {
        return (elem.triggers.length === 0) && (!elem.guard)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML040',
    message: '联结不能有守卫或触发器。',
    appliesTo: [ 'UMLTransition' ],
    constraint: function (elem) {
      if (elem.target instanceof type.UMLPseudostate && elem.target.kind === 'join') {
        return (elem.triggers.length === 0) && (!elem.guard)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML041',
    message: '分支必须始终以状态为目标。',
    appliesTo: [ 'UMLTransition' ],
    constraint: function (elem) {
      if (elem.source instanceof type.UMLPseudostate && elem.source.kind === 'fork') {
        return (elem.target instanceof type.UMLState)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML042',
    message: '联结必须始终源自一个状态',
    appliesTo: [ 'UMLTransition' ],
    constraint: function (elem) {
      if (elem.target instanceof type.UMLPseudostate && elem.target.kind === 'join') {
        return (elem.source instanceof type.UMLState)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML043',
    message: '转换输出的伪状态可能没有触发器(除了那些从初始伪状态出来的)',
    appliesTo: [ 'UMLTransition' ],
    constraint: function (elem) {
      if (elem.source instanceof type.UMLPseudostate && elem.source.kind !== 'initial') {
        return (elem.triggers.length === 0)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML044',
    message: '状态机的分类器上下文不能是接口',
    appliesTo: [ 'UMLStateMachine' ],
    constraint: function (elem) {
      return !(elem._parent instanceof type.UMLInterface)
    }
  }
)

rules.push(
  {
    id: 'UML045',
    message: '一个决策点有一个或两个输入边和至少一个输出边',
    appliesTo: [ 'UMLDecisionNode' ],
    constraint: function (elem) {
      return (elem.getIncomingEdges().length === 1 || elem.getIncomingEdges().length === 2) &&
      (elem.getOutgoingEdges().length >= 1)
    }
  }
)

rules.push(
  {
    id: 'UML046',
    message: '一个合并节点有一个传出边',
    appliesTo: [ 'UMLMergeNode' ],
    constraint: function (elem) {
      return (elem.getOutgoingEdges().length === 1)
    }
  }
)

rules.push(
  {
    id: 'UML047',
    message: '进出合并节点的边必须是所有对象流或所有控制流',
    appliesTo: [ 'UMLMergeNode' ],
    constraint: function (elem) {
      var edges = _.union(elem.getIncomingEdges(), elem.getOutgoingEdges())
      return _.every(edges, function (e) { return (e instanceof type.UMLControlFlow) }) ||
      _.every(edges, function (e) { return (e instanceof type.UMLObjectFlow) })
    }
  }
)

rules.push(
  {
    id: 'UML048',
    message: '初始节点没有传入边',
    appliesTo: [ 'UMLInitialNode' ],
    constraint: function (elem) {
      return (elem.getIncomingEdges().length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML049',
    message: '只有控制边可以将初始节点作为源',
    appliesTo: [ 'UMLInitialNode' ],
    constraint: function (elem) {
      return _.every(elem.getOutgoingEdges(), function (e) { return (e instanceof type.UMLControlFlow) })
    }
  }
)

rules.push(
  {
    id: 'UML050',
    message: '最终节点没有输出边',
    appliesTo: [ 'UMLFinalNode' ],
    constraint: function (elem) {
      return (elem.getOutgoingEdges().length === 0)
    }
  }
)

rules.push(
  {
    id: 'UML051',
    message: '一个分支节点有一个传入边',
    appliesTo: [ 'UMLForkNode' ],
    constraint: function (elem) {
      return (elem.getIncomingEdges().length === 1)
    }
  }
)

rules.push(
  {
    id: 'UML052',
    message: '进出分支节点的边必须是所有对象流或所有控制流',
    appliesTo: [ 'UMLForkNode' ],
    constraint: function (elem) {
      var edges = _.union(elem.getIncomingEdges(), elem.getOutgoingEdges())
      return _.every(edges, function (e) { return (e instanceof type.UMLControlFlow) }) ||
      _.every(edges, function (e) { return (e instanceof type.UMLObjectFlow) })
    }
  }
)

rules.push(
  {
    id: 'UML053',
    message: '一个连接节点有一个出边',
    appliesTo: [ 'UMLJoinNode' ],
    constraint: function (elem) {
      return (elem.getOutgoingEdges().length === 1)
    }
  }
)

rules.push(
  {
    id: 'UML054',
    message: '进出连接节点的边必须是所有对象流或所有控制流',
    appliesTo: [ 'UMLJoinNode' ],
    constraint: function (elem) {
      var edges = _.union(elem.getIncomingEdges(), elem.getOutgoingEdges())
      return _.every(edges, function (e) { return (e instanceof type.UMLControlFlow) }) ||
      _.every(edges, function (e) { return (e instanceof type.UMLObjectFlow) })
    }
  }
)

rules.push(
  {
    id: 'UML055',
    message: "进入或离开对象节点的所有边必须是对象流边或对象节点的“isControlType”属性应为真",
    appliesTo: [ 'UMLObjectNode' ],
    constraint: function (elem) {
      var edges = _.union(elem.getIncomingEdges(), elem.getOutgoingEdges())
      if (elem.isControlType === false) {
        return _.every(edges, function (e) { return (e instanceof type.UMLObjectFlow) })
      } else {
        return true
      }
    }
  }
)

rules.push(
  {
    id: 'UML056',
    message: '控制流的两端可能没有对象节点，除了具有控制类型的对象节点',
    appliesTo: [ 'UMLControlFlow' ],
    constraint: function (elem) {
      if (elem.source instanceof type.UMLObjectNode && elem.target instanceof type.UMLObjectNode) {
        return (elem.source.isControlType || elem.target.isControlType)
      }
      return true
    }
  }
)

rules.push(
  {
    id: 'UML057',
    message: '对象流的两端可能没有动作',
    appliesTo: [ 'UMLObjectFlow' ],
    constraint: function (elem) {
      return !(elem.source instanceof type.UMLAction && elem.target instanceof type.UMLAction)
    }
  }
)
