import { deleteShortUrl } from "../Home/Home.services";

describe("deleteShortUrl", () => {
  it("should correctly delete shortened url if exists", () => {
    const allUrls = [
      {
        uid: "Zdsasq",
        longUrl: "",
        nbClicks: 0,
      },
    ];
    const shortUrlToDelete = "http://localhost:3000/Zdsasq";

    expect(deleteShortUrl(shortUrlToDelete, allUrls)).toBe(
      "Your shortened url is correctly removed"
    );
  });
  it("should return an error if we try to remove a shortened url that does not exist", () => {
    const allUrls = [
      {
        uid: "Zdsasq",
        longUrl: "",
        nbClicks: 0,
      },
    ];
    const shortUrlToDelete = "http://localhost:3000/Azsdsds";

    expect(deleteShortUrl(shortUrlToDelete, allUrls)).toBe(
      "This URL does not exist"
    );
  });
});
