import { useState } from "react";


function Star({ full, onClick, moveHaver, museHaver }) {
    return (
        full ? (
            <span onClick={onClick} onMouseEnter={museHaver} onMouseLeave={moveHaver} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M12 2l2.92 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.08-1.01L12 2z" />
                </svg>
            </span>
        ) : (
            <span onClick={onClick}  onMouseEnter={museHaver} onMouseLeave={moveHaver}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="24"
                    height="24"
                >
                    <path d="M12 2l2.92 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.08-1.01L12 2z" />
                </svg>
            </span>
        )
    );

}

function Rating() {


    const [count, setCount] = useState(0);
    const [haver, setHaver] = useState(0);


    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
                <Star onClick={() => { setCount(index + 1) }} moveHaver={() => { setHaver(0) }} museHaver={() => { setHaver(index + 1) }} key={index} full={haver ? haver >= index + 1 : index < count} />))}
            <span>{count}</span>
        </div >

    )
}

export default Rating;