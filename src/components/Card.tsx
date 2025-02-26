import {Rezept, Zutat} from "../models/models.ts"
import {v4 as uuidv4} from 'uuid'
import {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import { IoMdAddCircle } from "react-icons/io";


interface CardsProps{
    element: Zutat | Rezept
}

interface imageCache{
    [key:string]: string
}

const API_Keys = [
    'FPSX9c4106e4c28741d1b96ed3345d8fcbaa',
    'FPSX55a0f8de4bc949329febd921e3703ba1'
]
const imageCache: imageCache = {

}
function Card({element}: CardsProps) {
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let searchTerm;

                if ("bezeichnung" in element) {
                    searchTerm = element.bezeichnung;
                } else if ("name" in element) {
                    searchTerm = element.name;
                }

                if (searchTerm) {
                    if (imageCache[searchTerm]) {
                        setImage(imageCache[searchTerm]);
                        return;
                    }

                    console.log("not in cache")

                    const url = `https://api.freepik.com/v1/resources?limit=1&term=${searchTerm}`;

                    const res: AxiosResponse = await axios.get(url, {
                        headers: {
                            'x-freepik-api-key': API_Keys[1],
                            'Access-Control-Allow-Origin': 'http://localhost:5173'
                        }
                    });

                    if (res.data && res.data.data[0] && res.data.data[0].image && res.data.data[0].image.source && res.data.data[0].image.source.url) {
                        const imageUrl = res.data.data[0].image.source.url;
                        setImage(imageUrl);
                        imageCache[searchTerm] = imageUrl;
                    }
                }
            } catch (error) {
                console.error("Error fetching image:", error);
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
                <div style={{position: "relative", width: "80%", padding: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "5px", display: "flex", flexDirection: "column"}}>
                    <img style={{margin: "5px", width: "auto", height: "150px", backgroundColor: "black", objectFit: "cover"}} src={image}/>
                    <div>
                        {renderInformation()}
                    </div>
                    <IoMdAddCircle style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '24px', color: 'black', cursor: 'pointer' }}/>
                </div>
    )
}
export default Card