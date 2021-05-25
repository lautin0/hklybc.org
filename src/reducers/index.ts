
import { combineReducers } from 'redux'
import { default as system } from './system'
import { default as worship } from './worship'
import { default as admin } from './admin'
import { default as sysInfo } from './sysInfo'

const rootReducer = combineReducers({
  worship,
  system,
  admin,
  sysInfo
})

export default function root(state: any, action: any) {
  return rootReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>