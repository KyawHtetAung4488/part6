const notificationReducer = (state = null ,action) => {
    switch (action.type) {
        case 'SET_NOTI':
            return action.noti
        default:
            return state
    }
}

export const setNoti = (noti, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTI',
            noti,
        })

        setTimeout(() => {
            dispatch(setNoti(null))
        }, time * 1000)
        
    }
}

export default notificationReducer