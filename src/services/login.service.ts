import { Request } from "express";
import { getBaseUrl } from "../utils/getBaseUrl";
import querystring from "querystring";

const loginService = (req: Request ) : string => {
      const baseUrl = getBaseUrl(req);
      const scope = "user-library-read playlist-read-private";
      const parameters = querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: `${baseUrl}/callback`,
      });
      const redirectUrl = `https://accounts.spotify.com/authorize?${parameters}`;
      return redirectUrl;
};

export default loginService