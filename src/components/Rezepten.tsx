import CardsGrid from "./CardsGrid.tsx";
import SearchBar from "./SearchBar.tsx";
import {useState, useEffect} from "react";
import axios from "axios";
import ButtonSearchBar from "./ButtonSearchBar.tsx";
function Rezepten() {
    const [typeOfSearch, setTypeOfSearch] = useState("")
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [rezepten, setRezepten] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://localhost:8080/rezepte', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    setRezepten(res.data)
                })
            } catch (e){
                console.log(e)
            }
        }

        fetchData().then(() => true)
    }, [])

    const REZEPTEN_MOCKS = [
        {
            "id": 1,
            "name": "Lachslasagne",
            "beschreibung": "Leckere Lasagne mit Lachs, Spinat und einer cremigen Bechamel-Soße.",
            "durchschnittlicheZubereitungszeit": "10 min",
            "ernaehrungskategorien": ["Vegetarisch", "Laktosefrei"],
            "zutaten": [
                { "bezeichnung": "Lasagneplatten", "einheit": "g", "menge": 300 },
                { "bezeichnung": "Spinat", "einheit": "g", "menge": 800 }
            ]
        },
        {
            "id": 2,
            "name": "Pasta Primavera",
            "beschreibung": "Frische Pasta mit saisonalem Gemüse und einer leichten Olivenöl-Soße.",
            "durchschnittlicheZubereitungszeit": "10 min",
            "ernaehrungskategorien": ["Vegetarisch"],
            "zutaten": [
                { "bezeichnung": "Pasta", "einheit": "g", "menge": 250 },
                { "bezeichnung": "Zucchini", "einheit": "g", "menge": 200 },
                { "bezeichnung": "Paprika", "einheit": "g", "menge": 150 },
                { "bezeichnung": "Olivenöl", "einheit": "ml", "menge": 50 }
            ]
        },
        {
            "id": 3,
            "name": "Hähnchen-Curry",
            "beschreibung": "Würziges Hähnchen-Curry mit Kokosmilch und frischem Gemüse.",
            "durchschnittlicheZubereitungszeit": "10 min",
            "ernaehrungskategorien": ["Glutenfrei"],
            "zutaten": [
                { "bezeichnung": "Hähnchenbrust", "einheit": "g", "menge": 400 },
                { "bezeichnung": "Kokosmilch", "einheit": "ml", "menge": 400 },
                { "bezeichnung": "Currypaste", "einheit": "g", "menge": 50 },
                { "bezeichnung": "Brokkoli", "einheit": "g", "menge": 200 }
            ]
        },
        {
            "id": 4,
            "name": "Schokoladenkekse",
            "beschreibung": "Leckere, weiche Schokoladenkekse, die einfach zuzubereiten sind.",
            "durchschnittlicheZubereitungszeit": "10 min",
            "ernaehrungskategorien": ["Vegetarisch"],
            "zutaten": [
                { "bezeichnung": "Mehl", "einheit": "g", "menge": 250 },
                { "bezeichnung": "Zucker", "einheit": "g", "menge": 150 },
                { "bezeichnung": "Butter", "einheit": "g", "menge": 100 },
                { "bezeichnung": "Schokoladenstückchen", "einheit": "g", "menge": 100 },
                { "bezeichnung": "Eier", "einheit": "Stück", "menge": 2 }
            ]
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
             if (typeOfSearch == 'rezept'){
                 await axios.get(`http://localhost:8080/rezepte/name?name=${searchValue}`,
                     {
                         headers: {
                             'Content-Type': 'application/json'
                         }
                     }).then(res => {
                     setRezepten(res.data)

                 })
             } else if (typeOfSearch == 'ernährungskategorien'){
                 await axios.get(`http://localhost:8080/rezepte/filter-by-ernaehrungskategorie?ernaehrungskategorie=${searchValue}`,
                     {
                         headers: {
                             'Content-Type': 'application/json'
                         }
                     }).then( res => {
                         setRezepten(res.data)
                 })
             } else if (typeOfSearch == "durchschnittlichezeit"){
                 await axios.get('http://localhost:8080/rezepte/filter-by-zeit?maxZeit=10', {
                     headers: {
                          'Content-Type': 'application/json'
                     }
                 }).then( res => {
                     setRezepten(res. data)
                 })
             }

         }catch (e) {
            console.log(e)
         }
    };

    return (
        <>
            <div style={{width: "90%", margin: "0 auto", marginBottom: "15px"}}>
                <li style={{display: "flex", gap: "20px"}}>
                    <div>
                        <ButtonSearchBar onClick={() => handleClickButton("rezept")} contentOfButton={"rezept"}/>
                        <ButtonSearchBar contentOfButton={"kategorien"} onClick={() => handleClickButton("ernährungskategorien")}/>
                        <ButtonSearchBar contentOfButton={"kochzeit"} onClick={() => handleClickButton("durchschnittlichezeit")}/>
                    </div>
                    {showSearchBar && <SearchBar onSubmitSearch={handleSearchSubmit} typeOfSearch={typeOfSearch}/>}</li>
            </div>
            <CardsGrid elements={REZEPTEN_MOCKS} />
        </>

    )
}

export default Rezepten