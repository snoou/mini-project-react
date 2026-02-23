import { useState } from 'react';
import './HeaderMain.css';

function HeaderMain() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='header'>
            <div>
                <div className='bg-img'>
                    <img src="./bg.png" alt="profile" />
                </div>
            </div>
            <div className='wrapper'>
                <div className='header-lable'>

                    <button className='hamburger-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        ☰
                    </button>

                    <ul className={`lable ${isMenuOpen ? 'open' : ''}`}>
                        <li>ارتباط با من</li>
                        <li>پروژه</li>
                        <li>گیت‌هاب</li>
                    </ul>

                    <div className='align-title'>
                        <h1>SNOOU</h1>
                    </div>

                </div>

                <div className='bio'>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quibusdam quasi provident asperiores ex. Deleniti ipsa illum fuga necessitatibus, nostrum blanditiis libero natus consequuntur dolorum nemo. Perspiciatis quod fugit officia.</p>
                                        <button className='bit-btn'>ارتباط با من</button>

                </div>
            </div>

        </div>
    )
}

export default HeaderMain;