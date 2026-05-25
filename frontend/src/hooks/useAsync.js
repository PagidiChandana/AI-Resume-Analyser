import { useCallback, useState } from "react";

export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        return await asyncFunction(...args);
      } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, loading, error };
};
