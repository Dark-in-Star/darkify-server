import { Router } from "express";
import { Request, Response } from "express";
import loginService from "./services/login.service";
import callbackService from "./services/callback.service";

const router = Router();

export const loginController = (req: Request, res: Response) => {
  try {
    const redirectUrl = loginService(req);
    res.redirect(redirectUrl);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const callbackController = async (req: Request, res: Response) => {
  try {
    const tokens = await callbackService(req);
    res.status(200).json({ success: true, data: tokens });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

router.get("/login", loginController);
router.get("/callback", callbackController);

export default router;
