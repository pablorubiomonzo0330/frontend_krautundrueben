import {Rezept, Zutat} from "../models/models.ts"
import {v4 as uuidv4} from 'uuid'
import {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";


interface CardsProps{
    element: Zutat | Rezept
}

function Card({element}: CardsProps) {
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let url;
                if ("bezeichnung" in element) {
                    url = `https://api.freepik.com/v1/resources?limit=1&term=${element.bezeichnung}`;
                } else if ("name" in element) {
                    url = `https://api.freepik.com/v1/resources?limit=1&term=${element.name}`;
                }

                if (url) {
                    const res: AxiosResponse = await axios.get(url, {
                        headers: {
                            'x-freepik-api-key': 'FPSX9c4106e4c28741d1b96ed3345d8fcbaa',
                            'Access-Control-Allow-Origin': 'http://localhost:5173'
                        }
                    });
                    console.log(res.data.data[0].image.source.url)
                    if (res.data && res.data.data[0] && res.data.data[0].image && res.data.data[0].image.source  && res.data.data[0].image.source.url) {
                        setImage(res.data.data[0].image.source.url);
                    }
                }
            } catch (error) {
                console.error("Error fetching image:", error);
                // Optionally, you could set an error state here
            }
        };

        fetchImage();
    }, [element]);

    const renderInformation = () => {
        return Object.entries(element).map(([key, value]) => {
            if (key.toString() === "id"){
                return
            }
            if ('zutaten' in element) {
                if (key !== 'zutaten'){
                    if (key.toString() === "name"){
                        return <li key={key}><h2>{value}</h2></li>
                    }
                    if(key.toString() === "ernaehrungskategorien") {
                        return <li>{value.join(", ")}</li>
                    }
                    return <li style={{marginTop: "2px", marginBottom: "2px", fontStyle:"italic"}} key={key}> {value}</li>
                } else {
                    element.zutaten.forEach(zutat => {
                        return <li key={uuidv4()}>{zutat.menge}{zutat.einheit}</li>
                    })
                }
            } else {
                if (key !== "einheit" && key !== "bestand"){
                    if (key === "bezeichnung") {
                        return <li key={key}><h2>{value}</h2></li>
                    }
                    return <li key={key}>{key.charAt(0).toUpperCase()}{key.slice(1)}: {value}{key === "nettopreis" ? "€" : key === "kalorien" ? " kcal" : "g"}</li>
                } else if (key === "einheit") {
                    return <li key={uuidv4()}>Menge: {element.bestand}{element.einheit}</li>
                }

            }
        })
    }


    return (
                <div style={{width: "80%", padding: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "5px", display: "flex", flexDirection: "column"}}>
                    <img style={{margin: "5px", width: "auto", height: "150px", backgroundColor: "black"}} src={image}/>
                    <div>
                        {renderInformation()}
                    </div>
                </div>
    )
}
export default Card