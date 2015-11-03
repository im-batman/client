'use strict'
/* @flow */

import { combineReducers } from 'redux'
import login from './login'
// $FlowFixMe login2 isnt typed
import login2 from './login2'
import devices from './devices'
import search from './search'
import profile from './profile'
import config from './config'
import tabbedRouter from './tabbed-router.js'
import {List} from 'immutable'

let history = List()
let index = 0

type State = { [key: string]: any }

function timeTravel (state: State, action: any): State {
  if (action.type !== 'timetravel') {
    history = history.slice(0, index + 1).push(state)
    index = history.size - 1
    return state
  } else {
    const { direction } = action.payload
    if (direction === 'back') {
      return history.get(--index, state)
    } else {
      return history.get(++index, state)
    }
  }
}

export default function (state: State, action: any): State {
  return timeTravel(
    combineReducers({
      login,
      login2,
      devices,
      tabbedRouter,
      search,
      profile,
      config
    })(state, action),
    action)
}
