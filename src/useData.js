import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/himchan94/d6578bbd50155664c2b070fa5ece38aa/raw/dca934928c4ccdf318148e0461274c69fc0837cb/cancer.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = (d) => {
    d["male"] = +d["male"];
    d["female"] = +d["female"];
    return d;
  };

  if (data) console.log(data);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
