import './Main.css'
import HeaderMain from './HeaderMain/HeaderMain'
import BodyMain from './BodyMain/BodyMain'
function Main() {
    return (
        <div className='size'>
            <header>
                <HeaderMain />
            </header>
            <main>
                <BodyMain />
            </main>
        </div>
    )

}

export default Main