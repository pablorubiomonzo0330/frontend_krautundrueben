import {Link} from "react-router-dom";
import Logo from "../assets/Kraut_und_Rueben.png"
interface NavbarProps {
    setShowRezepten?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setShowPage?: (value: (((prevState: string) => string) | string)) => void
}

function Navbar({setShowPage}: NavbarProps) {
    const NAVBAR_ELEMENTS = [
        {path: "/", label: "Home"},
        {path: "/rezepten", label: "Rezepten"},
        {path: "/zutaten", label: "Zutaten"},
        {path: "/ueberuns", label: "Über uns"}
    ];
    const handleSetRezepten = (label: string) => {
        if (setShowPage) {
            setShowPage(label)
        }
    }
    const renderNavbar = NAVBAR_ELEMENTS.map((element) => {
        return <li key={element.label} onClick={() => handleSetRezepten(element.label)} style={{marginRight: "75px"}}><Link style={{textDecoration: "none", color:"black"}}to={element.path}>{element.label}</Link></li>
    })


    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>

                <div style={{display: "flex", gap: "40px", alignItems: "center", left: "0px", marginLeft: "30px"}}>
                    <img style={{width: "150px", height: "70px"}}src={Logo} alt="Logo" />
                    <h1>KRAUT UND RUEBEN</h1>
                </div>

                <div style={{right: "0px"}}>
                    <ul style={{listStyleType: "none", display: "flex"}}>
                        {renderNavbar}
                    </ul>
                </div>

            </div>

        </>
    )
}

export default Navbar