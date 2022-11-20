import React, { useEffect } from "react";
import { useParams } from "react-router";
import { UrlDetails } from "../Home/Home.types";

const RedirectPage = () => {
  const { id } = useParams();
  useEffect(() => {
    const allUrlsDetails: UrlDetails[] = JSON.parse(
      localStorage.getItem("allUrlsDetails") || "[]"
    );
    const urlDetails = allUrlsDetails.find((url) => url.uid === id);

    if (urlDetails) {
      // eslint-disable-next-line no-restricted-globals
      location.href = urlDetails.longUrl;
    }
  }, [id]);

  return <div>Loader</div>;
};

export default RedirectPage;
