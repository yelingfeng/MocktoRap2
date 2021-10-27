import {
  isArray,
  isObject,
  isString,
  isNumber
} from '../utils'
import { reduce, random } from 'lodash-es'

import type {
  RapPropsType,
  ItfType,
  IRapProjectType
} from './type'

// 是否key带规则模式
const isRuleMode = (keyName: string) => {
  return keyName.indexOf('|') > -1
}

// 随机id
const getRandomId = () => {
  const id = `${random(10, 30)}${random(10, 50)}00${random(
    10,
    99
  )}`
  return Number(id)
}
const interfaceId = getRandomId()
// yelingfeng
const creatorId = 161514
// 模块名称
const moduleId = 482600
// 工程id
const repositoryId = 292320

// 基础转换
const renderProps = ({
  id,
  scope,
  type,
  name,
  rule,
  value,
  desc = '',
  pid,
  priority = 1
}) => {
  const jsontemp: RapPropsType = {
    id,
    scope,
    type,
    pos: 2,
    name,
    rule,
    value,
    description: desc,
    parentId: pid,
    priority,
    required: false,
    creatorId,
    moduleId,
    repositoryId,
    interfaceId
  }
  return jsontemp
}

const _transformType = (value) => {
  if (isNumber(value)) {
    return 'Number'
  } else if (isArray(value)) {
    return 'Array'
  } else if (isObject(value)) {
    return 'Object'
  } else {
    return 'String'
  }
}

/**
 * 数组转rapOrder字符串
 * @param arr
 */
const array2RapOrder = (arr) => {
  const r = arr.map((it) => {
    if (isString(it)) {
      return `'${it}'`
    } else if (isNumber(it)) {
      return it
    }
  })
  return `@order(${r})`
}

/**
 *
 * @param source
 * @param pid
 * @returns
 */
const getArrayChildProps = (
  source: Record<string, any>,
  pid
) => {
  // console.log(source, pid)
  const result: RapPropsType[] = []
  Object.entries(source).map(([key, it]) => {
    if (it !== null) {
      // 将数组转场rap order字符串
      const value = isArray(it) ? array2RapOrder(it) : it
      // 取类型
      const type = _transformType(it[0])
      const _prop = {
        id: getRandomId(),
        type,
        name: key,
        rule: '',
        pid,
        scope: 'response',
        value
      }
      result.push(renderProps(_prop))
    }
  })
  return result
}

/**
 * 转换 obj对象
 * @param obj
 * @param pid
 * @param key
 */
const _transformArrayObject = (obj, pid, key) => {
  if (isObject(obj)) {
    const childProps = getArrayChildProps(obj, pid)
    return childProps
  }
  return obj
}

/**
 * 转换json 数组类型 Value
 * @param value 值
 * @param pid
 */
const _transformArrayValue = (value, pid, key) => {
  if (isArray(value)) {
    if (!isRuleMode(key)) {
      // console.log(value)
      // 遍历数组转换 以key为键值 value为组的对象结构
      const result = reduce(
        value,
        (r: any, item: any, key: any) => {
          Object.entries(item).map(([k, v]) => {
            if (v !== null) {
              r[k] ? r[k].push(v) : (r[k] = [v])
            } else {
              r[k] = null
            }
          })
          return r
        },
        {}
      )
      const childProps = getArrayChildProps(result, pid)
      return childProps
    } else {
      const childProps = getArrayChildProps(value[0], pid)
      return childProps
    }
  } else {
    return value
  }
}

/**
 *
 * @param obj  元数据
 * @param pid  父节点id
 * @returns
 */
const _tranRespRender = (obj, pid) => {
  const result: any = []
  Object.entries(obj).map(([key, value]) => {
    // console.log(`key:${key}`)
    const obj = {
      id: getRandomId(),
      type: _transformType(value),
      name: key,
      rule: '',
      pid,
      scope: 'response',
      value
    }
    // 数组添加子属性
    if (isArray(value)) {
      const item = _transformArrayValue(value, obj.id, key)
      item.map((it) => {
        result.push(it)
      })
      // value有长度 且 不带规则的 纯数据结构
      if (value.length && !isRuleMode(key)) {
        obj.name = `${obj.name}|${value.length}`
      }
      obj.type = 'Array'
      obj.value = ''
    } else if (isObject(value)) {
      const item = _transformArrayObject(value, obj.id, key)
      item.map((it) => {
        result.push(it)
      })
      obj.type = 'Object'
      obj.value = ''
    }
    result.push(renderProps(obj))
  })
  return result
}

/**
 * 转props属性json
 * @param respSource
 * @param reqSource
 * @returns
 */
export const _transProperties = (respSource, reqSource) => {
  let result: any = []
  const pid = -1
  Object.entries(reqSource).map(([key, value]) => {
    // console.log(key, value)
    if (key) {
      const _type = _transformType(value)
      const it = renderProps({
        id: getRandomId(),
        type: _type,
        name: key,
        rule: '',
        pid,
        scope: 'request',
        value
      })
      result.push(it)
    }
  })

  result = result.concat(_tranRespRender(respSource, pid))

  // Object.entries(respSource).map(([key, value]) => {
  //   // console.log(`key:${key}`)
  //   const _type = _transformType(value)
  //   const obj = {
  //     id: getRandomId(),
  //     type: _type,
  //     name: key,
  //     rule: '',
  //     pid,
  //     scope: 'response',
  //     value,
  //   }
  //   // 数组添加子属性
  //   if (isArray(value) && key.indexOf('|')<0) {
  //     const item = _transformArrayValue(value, obj.id)
  //     item.map((it) => {
  //       result.push(it)
  //     })
  //     if (value.length && isArray(value) ) {
  //       obj.name = `${obj.name}|${value.length}`
  //     }
  //     obj.value = ''
  //   }
  //   // 对象
  //   else if(isObject(value)){
  //     // const item = _transformObjectValue(value, obj.id)
  //     // item.map((it) => {
  //     //   result.push(it)
  //     // })
  //     // obj.value = ''
  //   }

  //   const props = renderProps(obj)
  //   result.push(props)
  // })
  return result
}

/**
 * 转换接口json信息
 */
const _transInterfaceJson = ({
  name,
  url,
  method,
  bodyOption = 'FORM_DATA',
  description = '',
  creatorId,
  // 模块名称
  moduleId,
  // 工程id
  repositoryId
}) => {
  const itf = {
    id: interfaceId,
    name,
    url,
    method,
    bodyOption,
    description,
    priority: 1,
    status: 200,
    creatorId,
    moduleId,
    repositoryId
  }
  return itf
}

/**
 * 转换mock数据
 * @param reqSource request 源
 * @param respSource resp 源
 * @param icfg 接口信息
 * @param prject 工程相关参数
 */
export const transformMock = (
  reqSource: any,
  respSource: any,
  icfg: ItfType,
  project: IRapProjectType
) => {
  const itf = _transInterfaceJson({
    name: icfg.name,
    url: icfg.url,
    method: icfg.method,
    bodyOption: icfg.bodyOption,
    description: icfg.desc,
    creatorId: project.creatorId,
    moduleId: project.moduleId,
    repositoryId: project.repositoryId
  })
  // console.log(reqSource)
  const properties = _transProperties(respSource, reqSource)
  return {
    itf,
    properties
  }
}
