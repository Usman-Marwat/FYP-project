import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, seData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    //with these line breaks we are separating
    if (!response.ok) {
      setError(true);
      return response;
    }
    // different stories in our code
    setError(false);
    console.log(response.data);
    seData(response.data);
    return response;

    // extra note: We can simplify the above code as
    /*
    setError(!response.ok);
    setData(response.data);
    return response
    */
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
