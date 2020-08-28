import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const [response, setResponse] = useState("Hello World");

  useEffect( () => {

    const fetchData = async () => {
      const res = await axios.get('api/');
      setResponse(res.data);
    }
    fetchData();
  }, []);

  return (
    <div> {response} </div>
  )
}

export default App;
