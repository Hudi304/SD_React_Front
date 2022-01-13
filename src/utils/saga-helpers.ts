import { put } from 'redux-saga/effects'
import { SNACK_ACTIONS } from '../snackbar/snack.types'

declare interface String {
  loading(): string
  fulfilled(): string
  failed(): string
}

String.prototype.loading = function (this: string): string {
  return `${this}_LOADING`
}

String.prototype.fulfilled = function (this: string): string {
  return `${this}_FULFILLED`
}

String.prototype.failed = function (this: string): string {
  return `${this}_FAILED`
}

export function safeSaga(func, action = '', postActions?: string[]) {
  return function* (args) {
    try {
      yield put({
        type: action.loading()
      })

      let response
      let result

      if (action) {
        response = yield func(args)
        // result = yield func(args)
      } else {
        response = yield* func(args)
        // result = yield* func(args)
      }

    //   console.log('response : ', response)
    //   console.log('action : ', action)
    //   console.log('result : ', result)

      if (action) {
        yield put({
          type: action.fulfilled(),
          payload: response
        })

        const REPLACE_STRINGS = [
          { action: 'ADD', trans: 'snack.added' },
          { action: 'UPDATE', trans: 'snack.saved' },
          { action: 'REMOVE', trans: 'snack.removed' }
        ]
        const found = REPLACE_STRINGS.find(str => action.includes(str.action))

        if (found) {
          const strings = action.toLocaleLowerCase().split('_')
          // strings[0] = i18n.t(found.trans)
          yield put({
            type: SNACK_ACTIONS.SHOW_SNACK,
            payload: {
              message: strings.join(' ')
            }
          })
        }

        if (postActions) {
          for (let i = 0; i <= postActions.length; i++) {
            if (postActions[i]) {
              yield put({
                type: postActions[i],
                payload: args.payload ? args.payload : {}
              })
            }
          }
        }
      }
    } catch (error: any) {
      // console.log('error', error)
      const errorFirstMsg = (error.messages && error.messages[0]) || ''
      // show the error msg only once in the snack
      let errorMsg = errorFirstMsg.includes('--') ? errorFirstMsg.replace(/↵ -- /g, '\n').split('--')[1].trim() : errorFirstMsg

      if (errorMsg.charAt(0) === ':') {
        errorMsg = errorMsg.substr(1)
      }

      if (action) {
        yield put({
          type: action.failed(),
          payload: error
        })
      }
      yield put({
        type: SNACK_ACTIONS.SHOW_SNACK,
        payload: {
          message: errorMsg,
          type: 'fail'
        }
      })
    }
  }
}
