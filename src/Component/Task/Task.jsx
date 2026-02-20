import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useState } from "react";
import "./Task.css";

export default function Task() {
    

    return (
        <div className="github">
            <GitHubCalendar
                username="snoou"
                blockSize={14}
                blockMargin={4}
                fontSize={12}
                colorScheme="dark"
                theme={{
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
            />
        </div>
    );
}
