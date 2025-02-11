import BackgroundImage from "../assets/exotic-fruits-berries-spanish-market.jpg"
function HeroBanner(){
    return <>
        <div style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            height: "650px", // Adjust height as needed
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat" // Prevents the image from repeating
        }}>
            <h1 style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                margin: "0 auto",
                fontSize: "100px"
            }}>KRAUT UND RUEBEN</h1>
            <h2 style={{color: "white"}}>BIO FRISCH FÜR HAMBURG</h2>
        </div>
    </>
}

export default HeroBanner