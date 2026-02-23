import { Link } from 'react-router'
import './HeaderMain.css'

function HeaderMain() {
    return (
        <div className='header'>
            <div>
                <div className='bg-img'>
                    <img src="./bg.png" alt="profile" />
                </div>
            </div>

            <div className='header-lable'>
                <ul className='lable'>
                    <li>
                        ارتباط با من
                    </li>
                    <li>
                        پروژه
                    </li>

                    <li>گیت‌هاب</li>

                </ul>
                <div className='align-title'>
                    <h1>SNOOU</h1>

                </div>

            </div>
        </div>
    )
}

export default HeaderMain