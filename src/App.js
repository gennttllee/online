import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import './App.css';
import Card from './components/Card';
import { Store } from '../src/mystore'

function App() {
  const { state, dispatch } = useContext(Store)
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [check, setCheck] = useState([])
  const [bother, setBother] = useState(false)
  const [currency, setCurrency] = useState()
  const [selectBox, setSelectBox] = useState()
  const [show, setShow] = useState(false)
  const myRef = useRef()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data: response } = await axios.get('https://api.terawork.com/service-categories/sellers-services/computer-software-development')
      const { data: res } = await axios.get('https://api.terawork.com/resources')
      setCurrency(res.data.currencies)
      setData(response.data.service_search_results.hits);
      if (state.cart.cartItems.length >= 1) {
        setSelect(state.cart.cartItems)
        setBother(true);
      } else {
        setSelect(response.data.service_search_results.hits);
        setBother(false);
      }
      let newItem = []
      state.cart.cartItems.forEach(item => {
        newItem.push(item._source.profile_id)
      })
      setCheck(newItem)
    } catch (error) {
      console.log(error.message)
    }
  }

  const toggle = () => {
    setSelect(data)
    setBother(false)
  }

  const favourites = () => {
    setSelect(state.cart.cartItems)
    setBother(true)

  }

  const added = (index, item) => {
    if (check.includes(item._source.profile_id)) {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
      const newCheck = check.filter(product => {
        return product !== item._source.profile_id
      })
      setCheck(newCheck)
      if (select === state.cart.cartItems) {
        window.location.reload();
      }
    } else {
      dispatch({ type: 'CART_ADD_ITEM', payload: item })
      setCheck(check => [...check, item._source.profile_id])
    }
  }

  const clickMe = (unit) => {
    setLoading(true)
    setSelectBox(unit)
    setShow(!show)
    for (const item of select) {
      const converter = currency.filter(product => {
        return product.short === item._source.currency_name
      })
      if (converter[0].divider > unit.divider) {
        const figure = item._source.starting_from * converter[0].divider
        item._source.starting_from = Math.floor(figure)
      } else if (converter[0].divider < unit.divider) {
        const figureMe = item._source.starting_from / unit.divider
        item._source.starting_from = Math.floor(figureMe)
      }
    }
    for (const item of select) {
      item._source.currency_name = unit.short
  }
    setLoading(false)
  }

  const visible = () => {
    setSelectBox()
    setShow(!show)
  }

  return (
    <div className="app">
      <div className='button-container'>
        <h1 className='dev'>Dev<span className='span'>Hire</span></h1>
        <button onClick={toggle} className={bother ? 'btn1' : 'btn'}>  <span className={bother ? `material-symbols-outlined love` : `material-symbols-outlined icon`}>
          search
        </span> Home</button>
        <button onClick={favourites} className={bother ? 'btn' : 'btn1'}> <span className={bother ? `material-symbols-outlined icon` : `material-symbols-outlined love`}>
          favorite
        </span>favorites</button>
      </div>
      <div className='flex'>
        <h1 className='h1'>Hire Top Developers</h1>
        <div className='row'>
          {select ?
            select === data ? select.map((item, index) => <Card
              key={index}
              class={check.includes(item._source.profile_id) ? 'added' : 'btn2'}
              click={() => added(index, item)}
              icon={check.includes(item._source.profile_id) ? 'lover1' : 'lover'}
              image={item._source.service_photo}
              avatar={item._source.avatar}
              text={item._source.url_name}
              currency={item._source.currency_name}
              figure={item._source.starting_from}
              hire='hire'
            />) : state.cart.cartItems.length > 0 ? select.map((item, index) => <Card
              key={index}
              class={check.includes(item._source.profile_id) ? 'added' : 'btn2'}
              click={() => added(index, item)}
              icon={check.includes(item._source.profile_id) ? 'lover1' : 'lover'}
              image={item._source.service_photo}
              avatar={item._source.avatar}
              text={item._source.url_name}
              currency={item._source.currency_name}
              figure={item._source.starting_from}
              hire='hire'
            />) : <h1>No favorites added</h1>
            : <h1>loading...</h1>}
        </div>
        {currency && <div onMouseLeave={() => setShow(false)} className='ul'>
          <button onMouseEnter={() => setShow(true)} className='drop' onClick={visible}>
            {loading ? <h3>loading...</h3> : <table>
              <tr>
                <td>
                  <img className='dropImage' src={selectBox ? selectBox.flag_url : currency[0].flag_url} alt='flag' />
                </td>
                <td ref={myRef}>
                  {selectBox ? selectBox.name : currency[0].name}
                </td>
                <td className='menu'>
                  <span class="material-symbols-outlined">
                    arrow_drop_down
                  </span>
                </td>
              </tr>
            </table>}
          </button>
          {currency.map(unit => <div onClick={() => clickMe(unit)} key={unit.id}>
            <ul className={show ? 'li' : 'hide'}> <img className='listImage' src={unit.flag_url} alt='flag' /> {unit.name}</ul>
          </div>)}
        </div>}
      </div>
    </div>
  );
}

export default App;
