// yelingfeng
const creatorId = 161514
// 模块名称
const moduleId = 482600
// 工程id
const repositoryId = 292320

import {
  isArray,
  isObject,
  isString,
  isNumber,
} from '../utils'

const _transformType = (value) => {
  if (isString(value)) {
    return 'String'
  } else if (isNumber(value)) {
    return 'Number'
  } else if (isArray(value)) {
    return 'Array'
  } else if (isObject(value)) {
    return 'Object'
  } else {
    return null
  }
}

// 转换值
const _transformValue = (value) => {
  if (isArray(value)) {
    console.log(value)
  }
}

// 基础转换
const _templateBase = ({
  type,
  name,
  rule,
  value,
  desc = '',
  pid,
  priority = 1,
}) => {
  const jsontemp = {
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
  }
  return jsontemp
}

/**
 * 转换mock数据
 * @param opt
 */
export const transformMock = (opt: any) => {
  const result: any = []
  Object.entries(opt).map(([key, value]) => {
    // console.log(`key:${key}`)
    const _type = _transformType(value)
    const rule = ''
    const pid = -1
    const v = ''

    _transformValue(value)
    const obj = {
      type: _type,
      name: key,
      rule,
      pid,
      value: v,
    }
    const props = _templateBase(obj)
    result.push(props)
  })
  return result
}
