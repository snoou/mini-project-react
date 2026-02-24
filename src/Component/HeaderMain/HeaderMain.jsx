import { useState } from 'react';
import './HeaderMain.css';

function HeaderMain() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='header'>

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

            <div className='img-container'>
                <div className='bg-img'>
                    <img src="./bg.png" alt="profile" />
                </div>
            </div>

            <div className='bio'>
                <p>
                    <span> سجاد یاراحمدی</span>  ،توسعه‌دهنده فرانت‌اند
                    طراح و پیاده‌ساز رابط‌های کاربری مدرن و ریسپانسیو با استفاده از React و JavaScript.
                    تمرکز بر کدنویسی تمیز، بهینه‌سازی عملکرد و خلق تجربه کاربری روان و جذاب.
                    علاقه‌مند به یادگیری مداوم، حل چالش‌های جدید و تبدیل ایده‌ها به محصولات واقعی در دنیای وب
                </p>
                <button className='bit-btn'>ارتباط با من</button>
            </div>
        </div>
    );
}

export default HeaderMain;