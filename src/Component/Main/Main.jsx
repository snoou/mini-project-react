import './Main.css'
import HeaderMain from './HeaderMain/HeaderMain'
import BodyMain from './BodyMain/BodyMain'
function Main() {
    const projects = [
        {
            name: "مدیریت درامد و هزینه",
            url: "https://github.com/snoou/react-internship-project",
            tag:'https://react-internship-project.snoou.workers.dev',
            image: "./site.png",
            description: "نمونه پروژه واقعی لیست درامد ها و هزینه ها با پنل مدیریت"
        },
        {
            name: "محاسبه دنگ",
            url: "https://github.com/snoou/frontend-react-dongidongi",
            tag:"https://frontend-react-dongidongi.snoou.workers.dev/",
            image: "./dangi.png",
            description: " نمونه پروژه محاسبه دنگ و بدهی و هزینه های اشتراکی"
        }, {
            name: "پیشنهاد غذای رندم",
            url: "https://github.com/snoou/random-Food",
            tag : "https://food.snoou.workers.dev/",
            image: "./Food.png",
            description: "سایت طراحی شده با ریاکت برای پیشنهاد غذای رندوم به کاربر "
        }
    ];
    return (
        <div className='size'>
          
            <main>
                <BodyMain projects= {projects} />
            </main>
        </div>
    )

}

export default Main