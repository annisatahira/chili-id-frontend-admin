import { authConstants } from '../constants'
import { authService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'

const login = (payload) => {
    return dispatch => {
        dispatch(request({ payload }))

        authService.login(payload)
            .then(
                data => {
                    dispatch(success(data))
                    history.push('/')
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            )
    }

    function request(data) {
        return { type: authConstants.LOGIN_REQUEST, data }
    }

    function success(data) {
        return { type: authConstants.LOGIN_SUCCESS, data }
    }

    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error }
    }
}

const logout = () => {
    authService.logout()

    return { type: authConstants.LOGOUT }
}

export const authActions = {
    login,
    logout
}
