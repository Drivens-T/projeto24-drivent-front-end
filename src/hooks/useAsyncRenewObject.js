import { useState, useEffect } from 'react';

export default function useAsyncRenewObject(handler, immediate = true, initialState = null) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // eslint-disable-next-line space-before-function-paren
  const act = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const data = await handler(...args);
      if (data) setData({ ...data });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    act,
  };
}
