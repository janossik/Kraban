import { useState, useEffect } from "react";

const useGet = <DataType extends unknown>(
  request: () => Promise<DataType>
): [DataType | null, boolean, () => void] => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshValue, setRefreshValue] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    request()
      .then((data) => {
        setLoading(false);
        data && setData(data);
      })
      .catch((err) => console.error(err.message) /* temporarily */);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshValue]);

  const refresh = () => setRefreshValue(!refreshValue);

  return [data, loading, refresh];
};

export default useGet;
