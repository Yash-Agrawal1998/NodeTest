import express from 'express';
import { verifyOtp, sendOtp } from "../controllers/OtpController.mjs";

export const otpRoute = express.Router();

otpRoute.post('/sendOtp', sendOtp);
otpRoute.post('/verifyOtp', verifyOtp);
