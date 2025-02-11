import './App.css'
import Navbar from "./components/Navbar"
import {useEffect, useState} from "react";
import Rezepten from "./components/Rezepten.tsx"
import Zutaten from "./components/Zutaten.tsx";
import Zutat from "./components/Zutat.tsx"
import HeroBanner from "./components/HeroBanner.tsx";
function App() {

    const [showPage, setShowPage] = useState("Home")

    useEffect(() => {
        setShowPage("Home")
    }, [])

    console.log(showPage)
    return (
        <>
            <div style={{marginBottom: "50px"}}>
                <Navbar setShowPage={setShowPage}/>
            </div>
            <div>
                {showPage == "Home" && <HeroBanner/>}
                {showPage == "Rezepten" && <Rezepten />}
                {showPage == "Zutaten" && <Zutaten />}
                {showPage == "Zutat" && <Zutat />}
            </div>
        </>
    )
}

export default App
