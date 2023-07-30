import { useState, useEffect } from "react";
import { sendWishList } from "../api/api";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Loading from "../ui-components/Loding/Loading";

function useWishList(fetchRecords) {
  const [loading, setLoading] = useState(true);
  const handleUpdateWishlist = async (id, is_liked) => {
    try {
      let data = {
        is_liked: is_liked,
        short_id: Number(id),
      };
      const response = await sendWishList(data);
      let message = "";
      if (response && response.data) {
        if (is_liked) {
          message = "Profile is shortlisted successfully";
        } else {
          message = "Profile is removed successfully";
        }
        toast.success(response.message || message, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        });
        await fetchRecords();
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Zoom,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    // setLoading(true);
    // let data = {
    //   is_liked: is_liked,
    //   short_id: Number(id),
    // };
    // handleUpdateWishlist(data, is_liked);
  });
  <>
    <Loading
      styles={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
      }}
      loading={true}
    />
    <ToastContainer />;
  </>;

  return { handleUpdateWishlist, loading };
}
export default useWishList;
