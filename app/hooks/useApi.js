import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, seData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    //we will set data even if we have error or not
    if (!response.ok) {
      setError(true);
      return response;
    }
    // different stories in our code
    setError(false);
    seData(response.data);
    return response;

    // extra note: We can simplify the above code starting from line 14 as
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
