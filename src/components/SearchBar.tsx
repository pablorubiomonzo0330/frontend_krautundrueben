import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
    typeOfSearch: string;
    onSubmitSearch: (searchValue: string) => void
}

function SearchBar({ typeOfSearch, onSubmitSearch }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchValue !== ""){
            onSubmitSearch(searchValue);
        }
        setSearchValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    value={searchValue}
                    style={{ height: "30px" }}
                    placeholder={`Suche nach ${typeOfSearch.charAt(0).toUpperCase()}${typeOfSearch.slice(1)}`}
                    onChange={(e) => setSearchValue(e.target.value)} // Update state on input change
                />
                <IoSearchOutline onClick={handleSubmit} style={{ cursor: "pointer" }} />
            </li>
        </form>
    );
}

export default SearchBar;