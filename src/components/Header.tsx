import React from "react";
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../redux/index";
import {showModal, logout} from '../redux/loginInformationReducer'
import './Header.css'


const Header = () => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.toolkit.isLoggedIn
    )
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className='header'>
            <div>
                <Link to='/'>
                    <div>Лого</div>
                </Link>
                <Link to='/news'>
                    <div>Новости</div>
                </Link>
                {!isLoggedIn && <div className="login" onClick = {() => dispatch(showModal())}>Вход</div>}
                {isLoggedIn && <div className="logout" onClick = {() => dispatch(logout())}>Выход</div>}
            </div>
            <hr />
        </div>
    )
}

export default Header