import { nanoid } from "nanoid";
import { UrlDetails } from "./Home.types";

export const getAllUrls = (): UrlDetails[] => {
  return JSON.parse(localStorage.getItem("allUrlsDetails") || "[]");
};

export const getUniqueUid = (allUrls: UrlDetails[]) => {
  let uid = nanoid(6);
  const usedUids = allUrls.map((url) => url.uid);
  while (usedUids.includes(uid)) {
    uid = nanoid(6);
  }
  return uid;
};
