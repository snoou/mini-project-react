import { useState } from "react";

function Rating() {
    const [count, setCount] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    onClick={() => setCount(index + 1)}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(0)}
                    full={hover ? hover >= index + 1 : index < count}
                />
            ))}
            <span>{count}</span>
        </div>
    );
}

function Star({ full, onClick, onMouseEnter, onMouseLeave }) {
    return (
        <span
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ cursor: "pointer" }}
        >
            {full ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M12 2l2.92 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.08-1.01L12 2z" />
                </svg>
            ) : (
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
            )}
        </span>
    );
}
export default Rating;
