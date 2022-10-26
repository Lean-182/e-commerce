import loader from "../../assets/loading-gif.gif"
import "./loader.css"

export default function Loader() {
return (
  
        <div className="elLoader">
            <img src={loader} alt="loading..." width="300px" />
        </div>

    );
}