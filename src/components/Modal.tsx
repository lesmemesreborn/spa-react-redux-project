import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from "../redux/index";
import {hideModal, loginAsAdmin, loginAsUser} from '../redux/loginInformationReducer'
import './Modal.css'

const Modal = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const adminPassword = useSelector(
        (state:RootState) => state.toolkit.adminPassword
     )

    const adminLogin = useSelector(
        (state:RootState) => state.toolkit.adminLogin
    )

    const userPassword = useSelector(
        (state:RootState) => state.toolkit.userPassword
    )

    const userLogin = useSelector(
        (state:RootState) => state.toolkit.userLogin
    )

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (login === adminLogin && password === adminPassword) {
            dispatch(loginAsAdmin())
            dispatch(hideModal())
        } else if (login === userLogin && password === userPassword) {
            dispatch(loginAsUser())
            dispatch(hideModal())
        } else {
            alert('Неверный логин или пароль!')
        }
    }
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: Function
    ) => {
        setState(e.target.value);
    };

    return (
        <div className='modal'>
            <div className='form'>
                <form onSubmit={(e) => handleLogin(e)}>
                    <label htmlFor='login'>Введите логин: </label>
                    <input
                        id='login'
                        type='text'
                        value={login}
                        onChange={(e) => handleChange(e, setLogin)}
                        />
                        <br />
                        <label htmlFor='password'>Введите пароль:</label>
                    <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => handleChange(e, setPassword)}
                    />
                    <br />
                    <button>Подтвердить</button>
                </form>
                <button className='button-close' onClick={() => dispatch(hideModal())}>Х</button>
            </div>
        </div>
    )
}

export default Modal