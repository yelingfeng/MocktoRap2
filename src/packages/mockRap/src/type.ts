export type ScopeType = 'response' | 'request'

export type BaseType =
  | 'String'
  | 'Number'
  | 'Object'
  | 'Array'

/**
 * 接口信息定义
 */
export interface ItfType {
  name: string
  url: string
  method: string
  desc: string
  bodyOption: string
}

/**
 * rap 接口 response/request 类型
 */
export interface RapPropsType {
  scope: ScopeType
  id: number
  type: BaseType
  name: string
  value: string
  rule?: string | number
  description?: string
  parentId?: number
  priority?: number
  pos?: number
  required?: boolean
  interfaceId?: number
  creatorId?: number
  moduleId?: number
  repositoryId?: number
}
