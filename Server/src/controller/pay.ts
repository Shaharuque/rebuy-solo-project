import { RequestHandler } from "express";
import Payment from "../model/Payment";

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51K8U3bA8Wu6mzkGu5nh3VeyKBXsYzcknntMgfOne75UuPdvl2zincfWrFBxkOjQRwBZIjlODiNqrgLaGebi5DlCa00Ec2lfcDt",
  {
    apiVersion: "2023-08-16", // Use the appropriate API version
  }
);
export const payIntent: RequestHandler = async (req, res) => {
  try {
    const service = req.body;
    const price = service.price;
    const amount = price / 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating a PaymentIntent" });
  }
};

//After successful payment save the payment info to database buyedProducts will be an array of product ids
export const savePaymentInfo: RequestHandler = async (req, res) => {
  try {
    const { transactionId, buyedProducts, amount } = req.body.paymentPayload;
    const payment = await Payment.create({
        transactionId,
        payorId: req.user.id,
        buyedProduct: buyedProducts,
        totalPaid: amount,
        });
        
    res.status(200).json({
      success: true,
      message: "payment info saved",
      payment,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};
