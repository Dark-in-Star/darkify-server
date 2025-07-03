import { Tokens } from "../types/token";
import { Request } from "express";
import { getBaseUrl } from "../utils/getBaseUrl";
import axios from "axios";


const callbackService = async (req: Request): Promise<Tokens>=> {
    const baseUrl = getBaseUrl(req);
  const code = req.query.code as string;
  const response = await axios({
    method: "POST",
    url: `https://accounts.spotify.com/api/token`,
    params: {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${baseUrl}/callback`,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  const tokens: Tokens = {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
  return tokens;
}

export default callbackService