import {Zutat} from "../models/models.ts";
import CardsGrid from "./CardsGrid.tsx";
import ButtonSearchBar from "./ButtonSearchBar.tsx";
import SearchBar from "./SearchBar.tsx";
import axios from "axios";
import {useState} from "react";

function Zutaten(){
    const [typeOfSearch, setTypeOfSearch] = useState("")
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [zutaten, setZutaten] = useState([])
    const zutatenListe: Zutat[] = [
        {
            id: 1,
            bezeichnung: "Zucker",
            einheit: "g",
            nettopreis: 0.5,
            bestand: 1000,
            lieferantenId: 10,
            kalorien: 400,
            kohlenhydrate: 100,
            protein: 0
        },
        {
            id: 2,
            bezeichnung: "Mehl",
            einheit: "g",
            nettopreis: 0.8,
            bestand: 5000,
            lieferantenId: 15,
            kalorien: 364,
            kohlenhydrate: 76,
            protein: 10
        },
        {
            id: 3,
            bezeichnung: "Butter",
            einheit: "g",
            nettopreis: 1.2,
            bestand: 1500,
            lieferantenId: 20,
            kalorien: 717,
            kohlenhydrate: 0,
            protein: 1
        },
        {
            id: 4,
            bezeichnung: "Eier",
            einheit: "Stück",
            nettopreis: 0.3,
            bestand: 200,
            lieferantenId: 25,
            kalorien: 155,
            kohlenhydrate: 1.1,
            protein: 13
        },
        {
            id: 5,
            bezeichnung: "Olivenöl",
            einheit: "ml",
            nettopreis: 3.5,
            bestand: 1000,
            lieferantenId: 30,
            kalorien: 884,
            kohlenhydrate: 0,
            protein: 0
        }
    ];

    const handleClickButton = (typeOfSearchSearchBar: string): void => {
        if (typeOfSearch !== typeOfSearchSearchBar){
            setTypeOfSearch(typeOfSearchSearchBar)
        }
        setShowSearchBar(true)
    };

    const handleSearchSubmit = async (searchValue: string) => {
        try{
            await axios.get(`http://localhost:8080/zutat/name?name=${searchValue}`,
                {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    setZutaten(res.data)
            })// Modify link to point to correct endpoint
        }catch (e) {
            console.log(e)
        }
    };

    return(
        <>
            <div style={{width: "90%", margin: "0 auto", marginBottom: "15px"}}>
                <li style={{display: "flex", gap: "20px"}}>
                    <div>
                        <ButtonSearchBar onClick={() => handleClickButton("zutat")} contentOfButton={"zutat"}/>
                    </div>
                    {showSearchBar && <SearchBar onSubmitSearch={handleSearchSubmit} typeOfSearch={typeOfSearch}/> }</li>
            </div>
            <CardsGrid elements={zutatenListe} />
        </>
    )
}

export default Zutaten