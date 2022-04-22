import {createSlice} from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        showModal: true,
        userPassword: 'user',
        userLogin: 'user',
        adminPassword: 'admin',
        adminLogin: 'admin',
        news: [
            {
                date: new Date(),
                text: 'text template',
                title: 'Title template',
                isPublished: true,
            },
        ],
    },
    reducers: {
        loginAsUser: (state) => {
            state.isAdmin = false
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
        loginAsAdmin: (state) => {
            state.isAdmin = true;
            state.isLoggedIn = true;
        },
        hideModal: (state) => {
            state.showModal = false;
        },
        showModal: (state) => {
            state.showModal = true;
        },
        publishNewsItem: (state, action) => {
            action.payload.isPublished = true;
            state.news.push(action.payload);
        },
    }
})

export default loginSlice.reducer
export const {
    loginAsUser,
    logout,
    loginAsAdmin,
    showModal,
    hideModal,
    publishNewsItem,
} = loginSlice.actions