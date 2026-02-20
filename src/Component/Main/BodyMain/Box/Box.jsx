import './Box.css'
import { Link } from 'react-router'

function Box({ Info }) {
    return (
        <div className='card-container'>
            <div className='image-wrapper'>
                <img src={Info.image} alt={Info.name} />
            </div>
            <div className='card-content'>
                <div className='card-header'>
                    <div className='link-card'>
                        <Link to={Info.url}>
                            <span className='card-tag'>فایل پروژه</span>
                        </Link>

                        <Link to={Info.tag}>
                            <span className='card-tag'>دمو</span>
                        </Link>
                    </div>

                    <h3>{Info.name}</h3>
                </div>
                <p>{Info.description}</p>
            </div>
        </div>


    )
}

export default Box 