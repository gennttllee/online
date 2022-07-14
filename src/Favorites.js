import Main from "./main"
import Card from './components/Card'
import { useContext, } from 'react';
import './App.css';
import { Store } from './mystore'

export default function Favorites() {
  const added = (index, item) => {
    dispatch({ type: 'ADD_FAVORITES', payload: item })
}

  const { state, dispatch } = useContext(Store)
  return (
    <Main>
      <div className='row'>
        {state.favorites.length > 0 ?
          state.favorites.map((item, index) => <Card
            key={index}
            click={() => added(index, item)}
            icon={`fa fa-heart ${Object.values(state.favorites).includes(item) ? 'lover1' : 'lover2'}`}
            image={item._source.service_photo}
            avatar={item._source.avatar}
            text={item._source.url_name}
            currency={item._source.currency_name}
            figure={item._source.starting_from}
            hire='hire'
          />)
          : <h1 style={{paddingLeft : '1rem'}}>No favorites added</h1>}
      </div>
    </Main>
  )
}
