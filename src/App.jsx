import Skills from "./Component/Skills/Skills"
import './main'
const skills = [
  "React",
  "JavaScript",
  "HTML,CSS",
  "Tailwind",
  "Linux",
  "UI",
  "Figma",
  "Git",
  "mysql"
];

function App() {
  return (
    <div className="main">
      <Skills skills={skills} />
    </div>
  )
}

export default App 