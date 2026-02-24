import './Skills.css'
export default function Skills({ skills }) {


    return (
        <div>
            <div className='align'>
                <h2>مهارت های من  </h2>
            </div>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div className='skill' key={index}>
                        {skill}</div>

                ))}
            </div>
        </div>
    )
} 