import "./About.css"
const skills = [
    "React",
    "UI Engineering",
    "JavaScript",
    "HTML & CSS",
    "Tailwind",
    "Linux",
    "UI",
    "Figma",
    "Git"
];

export default function About() {
    return (
        <div className="container">
            <section className="hero">
                <div className="glassCard">
                    <h1 className="title">سجاد یاراحمدی</h1>
                    <p className="subtitle">
                        توسعه‌دهنده فرانت‌اند • مهندس نرم‌افزار
                    </p>
                    <div className="divider"></div>
                    <p className="bio">
                        برنامه‌نویس فرانت‌اند با تجربه در طراحی و توسعه وب‌سایت‌های واکنش‌گرا و کاربرپسند خلاق و مسئله‌گشا با مهارت در HTML، CSS و JavaScript توانمند در همکاری تیمی و مدیریت بخش‌های مختلف پروژه برای دستیابی به نتایج بهینه همیشه مشتاق یادگیری و ارائه راه‌حل‌های نوآورانه
                    </p>
                </div>
            </section>

            <section className="section">
                <h2 className="sectionTitle">مهارت‌ها</h2>
                <div className="grid">
                    {skills.map((skill , index) => (
                        <div key={index} className="skillCard">{skill}</div>

                    ))}
                </div>
            </section>

            <section className="section">
                <h2 className="sectionTitle">راه‌های ارتباطی</h2>
                <div className="contactCard">
                    <span className="contactItem">📞 ۰۹۹۲۶۰۶۴۱۰۸</span>
                    <span className="contactItem">
                        ✉️ sajjadyarahmadi2004@gmail.com
                    </span>
                </div>
            </section>

            <footer className="footer">
                {new Date().getFullYear()}  _ سجاد یاراحمدی
            </footer>
        </div>
    )
}
