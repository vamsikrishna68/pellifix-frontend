import React, { useState, useEffect } from "react";
import { getWishList } from "../../api/api";

const WishList = () => {
  // const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   fetchData();
  // }, []);


  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await getWishList();
  //     if (result && result.data) {
  //       setData(result.data);
  //       // setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* {console.log({ data })} */}
      <h1>Wish List</h1>
      {/* <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default WishList;
