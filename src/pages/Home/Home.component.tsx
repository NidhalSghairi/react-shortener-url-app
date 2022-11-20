import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import ShortenedUrl from "../../components/ShortenedUrl/ShortenedUrl.component";
import { UrlDetails } from "./Home.types";
import { deleteShortUrl, getAllUrls, getUniqueUid } from "./Home.services";

/* 
  In order to add the ability for users to choose
  between some custom shortened URLs, we can use multiple domain names.
  For instance, we have just localhost.
*/
const DOMAIN_NAMES = ["http://localhost:3000/"];

function Home() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [shortenedLinkError, setShortenedLinkError] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [selectedDomainName, setSelectedDomainName] = useState(
    "http://localhost:3000/"
  );
  const [nbClicks, setNbClicks] = useState<Number | null>(null);
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrlToDelete, setShortUrlToDelete] = useState("");
  const [message, setMessage] = useState("");

  const shortenUrl = () => {
    /*  The idea is to generate a new and unique uid for each long URL
        Then concatenate it with one of our domain names.
        Since we don't need to authenticate to shorten a long URL or do
        some other actions like deleting a shortened url we can use localstorage
        to get and save data without the need for a database. 
        With localStorage, we can also be sure that a user 
        cannot delete or rename a shortened URLs that others have created. 
    */
    // what if the given "long" url is already a shortened url ?
    // we cannot shorten an already shortened url.

    if (longUrl.includes(selectedDomainName)) {
      setShortenedLinkError("The given url is already shortened");
      setShortenedLink("");
      return;
    }

    const savedUrls = getAllUrls();
    const Uid = getUniqueUid(savedUrls);
    setShortenedLink(selectedDomainName + Uid);

    const newUrlDetails: UrlDetails = {
      uid: Uid,
      longUrl,
      nbClicks: 0,
    };
    savedUrls.push(newUrlDetails);
    localStorage.setItem("allUrlsDetails", JSON.stringify(savedUrls));
  };

  const getNbOfClicks = () => {
    const allUrlsDetails = getAllUrls();
    const split = shortUrl.split("/");
    const shortUrlUid = split[split.length - 1];
    const urlDetails = allUrlsDetails.find((url) => url.uid === shortUrlUid);

    if (urlDetails) {
      setNbClicks(urlDetails.nbClicks);
    }
  };

  const handleDeleteShortenedUrl = () => {
    const allUrlsDetails = getAllUrls();
    const succesOrErrorMessage = deleteShortUrl(
      shortUrlToDelete,
      allUrlsDetails
    );
    setMessage(succesOrErrorMessage);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3>select a domain name to customize your shorten url </h3>
        <Select
          value={selectedDomainName}
          label="Domain"
          onChange={(e) => setSelectedDomainName(e.target.value)}
        >
          {DOMAIN_NAMES.map((domainName) => (
            <MenuItem value={domainName}>{domainName}</MenuItem>
          ))}
        </Select>
      </div>
      <ShortenedUrl
        title="URL Shortener"
        inputPlaceholder="Enter link to be shortened"
        buttonTitle="Submit URL"
        value={longUrl}
        onChange={(e) => {
          setLongUrl(e.target.value);
        }}
        action={shortenUrl}
        text={shortenedLinkError || shortenedLink}
      />
      <ShortenedUrl
        title="Get number of clicks"
        inputPlaceholder="Enter short link to be see number of clicks"
        buttonTitle="Submit URL"
        value={shortUrl}
        onChange={(e) => {
          setShortUrl(e.target.value);
        }}
        action={getNbOfClicks}
        text={
          nbClicks
            ? `The number of clicks on your shortened url is: ${nbClicks}`
            : ""
        }
      />
      <ShortenedUrl
        title="Delete shortened link"
        inputPlaceholder="Enter short link to delete"
        buttonTitle="Submit URL"
        value={shortUrlToDelete}
        onChange={(e) => {
          setShortUrlToDelete(e.target.value);
        }}
        action={handleDeleteShortenedUrl}
        text={message}
      />
    </div>
  );
}

export default Home;
