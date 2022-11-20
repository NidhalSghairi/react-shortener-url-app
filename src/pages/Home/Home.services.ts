import { nanoid } from "nanoid";
import { UrlDetails } from "./Home.types";

export const getAllUrls = (): UrlDetails[] => {
  return JSON.parse(localStorage.getItem("allUrlsDetails") || "[]");
};

export const getUniqueUid = (allUrls: UrlDetails[]) => {
  /*  
    We use nanoid to generate a random id.
    The uniqueness of this id is not guaranteed (there is a low probability of collision),
    that's why we should always be sure that the uid should be unique. 
  */
  let uid = nanoid(6);
  const usedUids = allUrls.map((url) => url.uid);
  while (usedUids.includes(uid)) {
    uid = nanoid(6);
  }
  return uid;
};

export const deleteShortUrl = (
  shortUrlToDelete: string,
  allUrls: UrlDetails[]
) => {
  const split = shortUrlToDelete.split("/");
  const shortUrlUid = split[split.length - 1];
  const index = allUrls.findIndex((url) => url.uid === shortUrlUid);

  // We need to be sure that the shortened url to be deleted already exists.
  if (index !== -1) {
    allUrls.splice(index, 1);
    localStorage.setItem("allUrlsDetails", JSON.stringify(allUrls));
    return "Your shortened url is correctly removed";
  } else {
    return "This URL does not exist";
  }
};
