import './Box.css'


function Box({ Info }) {
    return (
        <a href={Info.url}>
            <div className='card-container'>
                <div className='image-wrapper'>
                    <img src={Info.image} alt={Info.name} />
                </div>
                <div className='card-content'>
                    <div className='card-header'>
                        <a href={Info.tag}>
                            <span className='card-tag'>دمو</span>
                        </a>
                        <h3>{Info.name}</h3>
                    </div>
                    <p>{Info.description}</p>
                </div>
            </div>
        </a>

    )
}

export default Box 