import { useAuthContext } from "./useAuthContext"
import { useThingsContext } from "./useThingsContext"

export const useLogout = () => {
    const {dispatch } = useAuthContext()
    const {dispatch:thingsDispatch} = useThingsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        thingsDispatch({type:'SET_THINGS', payload: null})
    }

    return {logout}
}