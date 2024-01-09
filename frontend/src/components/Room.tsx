import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
export const Room = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');

    useEffect(() => {
        if(!name) {
            window.location.href = '/';
        }
    },[name]);

    return (
      <div>Hi {name}</div>
    )
  }
  