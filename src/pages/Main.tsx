import {useSelector} from 'react-redux'
import {RootState} from '../redux/index'
import './Main.css'
import React from "react";

const Main = () => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.toolkit.isLoggedIn
    )
    const isAdmin = useSelector(
        (state: RootState) => state.toolkit.isAdmin
    )
    const userLogin = useSelector(
        (state: RootState) => state.toolkit.userLogin
    )

    return (
        <div className='main'>
            {!isLoggedIn && <div>Привет, гость!</div>}
            {isLoggedIn && !isAdmin && <div>Привет, {userLogin}!</div>}
            {isLoggedIn && isAdmin && <div>Привет, администратор!</div>}
        </div>
    )
}

export default Main