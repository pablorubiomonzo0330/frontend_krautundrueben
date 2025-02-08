import Card from "./Card.tsx"
import {Rezept, Zutat} from "../models/models.ts";
interface CardsGridProps {
    elements: Zutat[] | Rezept[]
}
function CardsGrid({elements}: CardsGridProps){
    const renderElements = elements.map((element) => {
        return <Card key={element.id} element={element}/>
    })

    return (
            <div style={{
                display: "grid",
                margin: "0 auto",
                width: "90%",
                gridTemplateColumns: "1fr 1fr 1fr",
                rowGap: "30px",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center"
            }}>
                {renderElements}
            </div>


    )
}

export default CardsGrid