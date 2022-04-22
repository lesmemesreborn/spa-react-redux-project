import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../redux/index";
import {publishNewsItem} from '../redux/loginInformationReducer'
import './News.css'

const News = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [proposedNews, setProposedNews] = useState([
        {
            date: new Date(),
            text: 'News template',
            title: 'Random Title',
        },
    ])

    const news = useSelector((state: RootState) => state.toolkit.news)
    const isAdmin = useSelector((state: RootState) => state.toolkit.isAdmin)
    const isLoggedIn = useSelector((state: RootState) => state.toolkit.isLoggedIn)
    const dispatch = useDispatch<AppDispatch>()

    const handlePublish = (date: number) => {
        const [newsItem] = proposedNews.filter((item) => item.date.getMilliseconds() === date)
        dispatch(publishNewsItem(newsItem))
        setProposedNews(
            proposedNews.filter((item) => item.date.getMilliseconds() !== date)
        )
    }

    const handleRemove = (date: number) => {
        setProposedNews(
            proposedNews.filter((item) => item.date.getMilliseconds() !== date)
        )
    }

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        setState: Function
    ) => {
        setState(e.target.value)
    }

    const handlePropose = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newsItem = {
            text,
            title,
            date: new Date(),
        }

        setProposedNews([...proposedNews, newsItem])
    }
    const getFullDate = (date: Date) => {
        let month, day;
        if (date.getMonth() + 1 < 10) {
            month = `0${date.getMonth() + 1}`
        } else {
            month = `${date.getMonth() + 1}`
        }

        if (date.getDate() < 10) {
            day = `0${date.getDate() + 1}`
        } else {
            day = `${date.getDate() + 1}`
        }
        return day + '.' + month + '.' + date.getFullYear()
    }

    return (
        <div className='news-page'>
            {isLoggedIn && (
                <div>
                    {!isAdmin && (
                        <form onSubmit={handlePropose}>
                            <h1>Предложить новость:</h1>
                            <label htmlFor='title'>Введите заголовок:  </label>
                            <input
                                id='title'
                                type='text'
                                value={title}
                                onChange={(e) => handleChange (e, setTitle)}/>
                        <br />
                            <label htmlFor='text'> Введите текст:  </label>
                            <textarea
                                id='text'
                                value={text}
                                onChange={(e) => handleChange (e, setText)}/>
                            <br />
                            <button onClick={() => alert('Новость предложена')}>Предложить</button>
                        </form>
                    )}


                    <h1>Предложенные новости:</h1>
                    <div className="news">
                        {proposedNews.length !== 0
                            ? proposedNews.map((item) => (
                                <div className='news-item' key={item.date.getMilliseconds()}>
                                    <i>{getFullDate(item.date)}</i>
                                    <br />
                                    <strong>{item.title}</strong>
                                    <div>{item.text}</div>
                                    {isAdmin && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleRemove(item.date.getMilliseconds())
                                                }
                                            >
                                                Отклонить
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handlePublish(item.date.getMilliseconds())
                                                }
                                            >
                                                Опубликовать
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))
                            : null}
                    </div>
                </div>
            )}
            <h1>Новости:</h1>s
            <div className="news">
                {news &&
                news.map((item) => (
                    <div className="news-item" key={item.date.getMilliseconds()}>
                        <i>{getFullDate(item.date)}</i>
                        <br />
                        <strong>{item.title}</strong>
                        <div>{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;