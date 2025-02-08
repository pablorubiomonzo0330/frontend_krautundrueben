import './App.css'
import Navbar from "./components/Navbar"
import {useEffect, useState} from "react";
import Rezepten from "./components/Rezepten.tsx"
import Zutaten from "./components/Zutaten.tsx";
import Zutat from "./components/Zutat.tsx"
function App() {

    useEffect(() => {
        setShowPage("")
    }, [])

    const [showPage, setShowPage] = useState("false")
    return (
        <>
            <div>
                <Navbar setShowPage={setShowPage}/>
            </div>
            <div>
                {showPage == "Rezepten" && <Rezepten />}
                {showPage == "Zutaten" && <Zutaten />}
                {showPage == "Zutat" && <Zutat />}
            </div>
        </>
    )
}

export default App
