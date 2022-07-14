import { Link } from "react-router-dom";
import { useState, useContext, useRef } from 'react';
import './App.css';
import { Store } from '../src/mystore'

function Main({ title, children }) {
    const { state, dispatch } = useContext(Store)
    const [show, setShow] = useState(false)
    const myRef = useRef()

    const [loading, setLoading] = useState(false)


    const currencyConverter = (unit) => {
        dispatch({ type: 'CART_UPDATE_CURRENCY', payload: { unit } })
        dispatch({ type: 'UPDATE_CURRENCY', payload: { unit } })
    }

    const clickMe = (unit) => {
        dispatch({ type: 'ADD_NAME', payload: unit })
        console.log(state.name)
        setShow(!show)
        currencyConverter(unit);
        setLoading(false)
    }

    const visible = () => {
        setShow(!show)
    }

    return (
        <div className="mainDiv" >
            <nav className='nav'>
                <h1 className='dev'>Dev<span className='span'>Hire</span></h1>
                    <Link className="home" to="/">
                    <button className="home">Home</button>
                    </Link>
                <Link className="favor" to="/favorites">
                    <button className="favor">Favorites</button>
                </Link>
            </nav>

            <section className="glory">
                <h1 className='h1'>Hire Top Developers</h1>
                <div className='flex'>
                    {state.currency.length > 0 && <div onMouseLeave={() => setShow(false)} className='ul'>
                        <button onMouseEnter={() => setShow(true)} className='drop' onClick={visible}>
                            {loading ? <h3>loading...</h3> : <div className='table'>
                                <img className='dropImage' src={state.name ? state.name.flag_url : state.currency[0].flag_url} alt='flag' />
                                <p ref={myRef}>
                                    {state.name ? state.name.name : state.currency[0].name}
                                </p>
                                <div className='menu'>
                                    <span class="material-symbols-outlined">
                                        arrow_drop_down
                                    </span>
                                </div>
                            </div>}
                        </button>
                        <div className="abs">
                            {state.currency.map(unit => <div className='div' onClick={() => clickMe(unit)} key={unit.id}>
                                <ul className={show ? 'li' : 'hide'}> <img className='listImage' src={unit.flag_url} alt='flag' /> {unit.name}</ul>
                            </div>)}
                        </div>
                    </div>}
                </div>
                <div>
                    {children}
                </div>
                <footer className='footer'>
                    <p>About the developer <a target='blank' href='https://www.mwprofile.com/'> click here</a></p>
                </footer>
            </section>
        </div>
    );
}

export default Main;

