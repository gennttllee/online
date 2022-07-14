import axios from 'axios';
import { useEffect, useState, useContext, } from 'react';
import './App.css';
import { Store } from './mystore'
import Main from "./main"
import Card from './components/Card'

export default function App() {
    const { state, dispatch } = useContext(Store)


    useEffect(() => {
        getData();

    }, []);

    const getData = async () => {
        try {
            const { data: response } = await axios.get('https://api.terawork.com/service-categories/sellers-services/computer-software-development')
            const { data: res } = await axios.get('https://api.terawork.com/resources')
            dispatch({ type: 'ADD_ITEMS', payload: response.data.service_search_results.hits })
            dispatch({ type: 'ADD_CURRENCY', payload: res.data.currencies })
        } catch (error) {
            console.log(error.message)
        }
    }

    const finder =(item)=>{
        const mama = state.favorites.find(element =>{
            return element._id === item._id
        })
        if (mama){
            return 'lover1';
        } else {
            return 'lover2';
        }
    }


    const added = (index, item) => {
        dispatch({ type: 'ADD_FAVORITES', payload: item })
    }

    return (
        <Main>
            <div className='row'>
                {state.items.length > 0 ?
                    state.items.map((item, index) => <Card
                        key={index}
                        click={() => added(index, item)}
                        icon={`fa fa-heart ${ finder(item)}`}
                        image={item._source.service_photo}
                        avatar={item._source.avatar}
                        text={item._source.url_name}
                        currency={item._source.currency_name}
                        figure={item._source.starting_from}
                        hire='hire'
                    />)
                    : <h1>Loading...</h1>}
            </div>
        </Main>
    )
}
