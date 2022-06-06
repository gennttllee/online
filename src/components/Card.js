import './card.css';

export default function Card(props) {
    return (
        <div className='card'>
            <button className={props.class} onClick={props.click}>
                <span className={`material-icons ${props.icon}`}>
                    favorite
                </span>
            </button>
            <img src={props.image} alt='images' className='first' />
            <img className='image' src={props.avatar} alt='avatars' />
            <h3  className='text'>{props.text}</h3>
            <p className='p'>{props.currency}<span>{props.figure}</span></p>
            <p className='hire'>{props.hire}</p>
        </div>
    )
}
