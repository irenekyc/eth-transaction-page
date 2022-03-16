import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const DEFAULT_GIF =
  "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";

interface UseFetchProps {
  keyword: string;
}

const useFetch = ({ keyword }: UseFetchProps) => {
  const [gifUrl, setGifUrl] = useState<string>(DEFAULT_GIF);
  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?apikey=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );

      const { data } = await response.json();
      setGifUrl(data[0]?.images?.downsized_medium?.url || DEFAULT_GIF);
    } catch (err) {
      setGifUrl(DEFAULT_GIF);
    }
  };
  useEffect(() => {
    if (keyword) {
      fetchGifs();
    }
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
