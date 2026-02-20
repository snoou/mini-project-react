import { Link } from 'react-router'
import './HeaderMain.css'

function HeaderMain() {
    return (
        <div className='header-main'>
            <div>
                <h1>SNOOU</h1>
            </div>

            <div className='space'>
                <Link to='/'>
                    <span>پروژه ها</span>
                </Link>

                <Link to='/about'>
                    <span>درباره من</span>
                </Link>

                <Link to='/task'>
                    <span>روزانه</span>
                </Link>

            </div>

            <button className='btn-heade-main'>ارتباط با من </button>

        </div >


    )
}

export default HeaderMain