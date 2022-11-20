import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import ShortenedUrl from "../../components/ShortenedUrl/ShortenedUrl.component";
import { UrlDetails } from "./Home.types";
import { getAllUrls, getUniqueUid } from "./Home.services";

const DOMAIN_NAMES = ["http://localhost:3000/"];

function Home() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [selectedDomainName, setSelectedDomainName] = useState(
    "http://localhost:3000/"
  );

  const shortenUrl = () => {
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
        text={shortenedLink}
      />
    </div>
  );
}

export default Home;
