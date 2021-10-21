import {
  isArray,
  isObject,
  isString,
  isNumber,
} from '../utils'
import { reduce, random } from 'lodash-es'

import type { RapPropsType, ItfType } from './type'
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
      const value = array2RapOrder(it)
      // 取类型
      const type = _transformType(it[0])
      const _prop = {
        id: getRandomId(),
        type,
        name: key,
        rule: '',
        pid,
        value,
      }
      result.push(renderProps(_prop))
    }
  })
  return result
}

/**
 * 转换json Value
 * @param value 值
 * @param pid
 */
const _transformValue = (value, pid) => {
  if (isArray(value)) {
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
    return value
  }
}

// 基础转换
const renderProps = ({
  id,
  type,
  name,
  rule,
  value,
  desc = '',
  pid,
  priority = 1,
}) => {
  const jsontemp: RapPropsType = {
    id,
    scope: 'response',
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
    // moduleId,
    // repositoryId,
    // interfaceId,
  }
  return jsontemp
}

/**
 * 转props属性json
 * @param opt
 * @returns
 */
export const _transProperties = (opt) => {
  const result: any = []
  Object.entries(opt).map(([key, value]) => {
    // console.log(`key:${key}`)
    const _type = _transformType(value)
    const pid = -1
    const obj = {
      id: getRandomId(),
      type: _type,
      name: key,
      rule: '',
      pid,
      value,
    }
    // 数组添加子属性
    if (isArray(value)) {
      const item = _transformValue(value, obj.id)
      item.map((it) => {
        result.push(it)
      })
      if (value.length) {
        obj.name = `${obj.name}|${value.length}`
      }
      obj.value = ''
    }

    const props = renderProps(obj)
    result.push(props)
  })
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
    // moduleId,
    // repositoryId,
  }
  return itf
}

/**
 * 转换mock数据
 * @param jsonSource 数据json源
 * @param icfg 接口信息
 */
export const transformMock = (
  jsonSource: any,
  icfg: ItfType
) => {
  const itf = _transInterfaceJson({
    name: icfg.name,
    url: icfg.url,
    method: icfg.method,
    bodyOption: icfg.bodyOption,
    description: icfg.desc,
  })
  const properties = _transProperties(jsonSource)
  return {
    itf,
    properties,
  }
}
