import './BodyMain.css'
import Box from './Box/Box'




function BodyMain() {
    const projects = [
        {
            name: "مدیریت درامد و هزینه",
            url: "",
            image: "./site.png",
            description: "یک سایت شخصی برای نمایش پروژه‌ها و رزومه با طراحی ریسپانسیو و انیمیشن‌های ساده."
        },
        {
            name: "مدیریت درامد و هزینه",
            url: "#",
            image: "./site.png",
            description: "یک سایت شخصی برای نمایش پروژه‌ها و رزومه با طراحی ریسپانسیو و انیمیشن‌های ساده."
        }, {
            name: "مدیریت درامد و هزینه",
            url: "",
            image: "./site.png",
            description: "یک سایت شخصی برای نمایش پروژه‌ها و رزومه با طراحی ریسپانسیو و انیمیشن‌های ساده."
        }, {
            name: "مدیریت درامد و هزینه",
            url: "",
            image: "./site.png",
            description: "یک سایت شخصی برای نمایش پروژه‌ها و رزومه با طراحی ریسپانسیو و انیمیشن‌های ساده."
        }, {
            name: "مدیریت درامد و هزینه",
            url: "",
            image: "./site.png",
            description: "یک سایت شخصی برای نمایش پروژه‌ها و رزومه با طراحی ریسپانسیو و انیمیشن‌های ساده."
        }
    ];

    return (
        <div>
            <div className='rev'>
                <div className='text-body-main'>
                    <h2>
                        نمونه کاری های انجام شده با ریاکت
                    </h2>
                    <p>
مجموعه‌ای از مینی‌پروژه‌های کاربردی با تمرکز بر طراحی کامپوننت‌محور، مدیریت state، ارتباط با API و پیاده‌سازی رابط‌های کاربری مدرن برای تبدیل ایده‌ها به تجربه‌های واقعی و قابل توسعه.
</p>
                </div>

                <div className=''>
                    <img className='img-body-main' src="./bg.jpg" alt="bg" />
                </div>
            </div>


            <div>
                <div className='info-main-site'>{
                    projects.map((project, index) => (
                        <Box key={index} Info={project} />
                    ))}
                </div>
            </div>
        </div>




    )
}

export default BodyMain
