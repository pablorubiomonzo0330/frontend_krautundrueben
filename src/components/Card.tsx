import {Rezept, Zutat} from "../models/models.ts"
import {v4 as uuidv4} from 'uuid'

interface CardsProps{
    element: Zutat | Rezept
}

function Card({element}: CardsProps) {
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
                    return <li key={key}>{value}</li>
                } else {
                    return <li key={uuidv4()}>{element.bestand}{element.einheit}</li>
                }
            }
        })
    }


    return (
                <div style={{width: "80%", padding: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "5px", display: "flex", flexDirection: "column"}}>
                    <div style={{margin: "5px", width: "auto", height: "150px", backgroundColor: "black"}} >
                    </div>
                    <div>
                        {renderInformation()}
                    </div>
                </div>
    )
}
export default Card