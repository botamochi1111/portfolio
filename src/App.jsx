import { Routes, Route, Link } from "react-router-dom"
import Background from "./Background"

function Home() {
  return (
    <div className="menu">
      <div className="title">星野 大 ポートフォリオ(まだ制作中)</div>
      <div className="title">Tai Hoshino Portofolio</div>


      <Link to="/project1">
        <div className="menu-item">ゲーム</div>
      </Link>

      <Link to="/project2">
        <div className="menu-item">D</div>
      </Link>
    </div>
  )
}

function Project1() {
  return (
    <div className="menu">
      <div className="title">ゲーム</div>
      <p>ここに説明</p>

      <Link to="/">
        <div className="menu-item">← Back</div>
      </Link>
    </div>
  )
}

function Project2() {
  return (
    <div className="menu">
      <div className="title">D</div>
      <p>ここに説明</p>

      <Link to="/">
        <div className="menu-item">← Back</div>
      </Link>
    </div>
  )
}

function App() {
  return (
    <>
      <Background />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
      </Routes>
    </>
  )
}

export default App