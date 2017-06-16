
export type Action = {
  type : string,
  meta? : Object,
  payload? : Object,
} | (Dispatch, () => Object) => void|Promise<*>
export type Dispatch = (Action) => void|Promise<*>

export type Router = Object
export type Navigation = { dispatch : Dispatch } & Object