import { useState } from "react"
import { Link } from "react-router-dom";
export const Landing = () => {
    const [name, setName] = useState('');
    // const history = useHistory();
  return (
    <div>
      <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />

      <Link to={`/room?name=${name}`}>
        <button onClick={()=>{}}>Join</button>
      </Link>
    </div>
    )
}

