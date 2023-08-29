import { RequestHandler } from "express";
import Ad from "../model/Ad";

export const postAd: RequestHandler = async (req, res) => {
  try {
    const {
      type,
      status,
      title,
      brand,
      description,
      model,
      category,
      price,
      images,
    } = req.body;
    const ad = await Ad.create({
      owner: req.user.id,
      category: category,
      choosenType: type,
      productName: title,
      brand,
      model,
      description,
      images,
      productStatus: status,
      basePrice: price,
    });
    res.status(201).json({
      success: true,
      message: "ad created",
      ad,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const getAllAd: RequestHandler = async (req, res) => {
  try {
    const searched = req.query.search;
    const tag = req.query.tag;

    if (searched && !tag) {
      const keyword = {
        $or: [
          { category: { $regex: searched, $options: "i" } },
          { productName: { $regex: searched, $options: "i" } },
          { brand: { $regex: searched, $options: "i" } },
          { model: { $regex: searched, $options: "i" } },
        ],
      };
      const ads = await Ad.find(keyword).populate("owner", "-password");

      res.status(200).json({
        success: true,
        message: "all ads",
        ads,
      });
    }

    if (tag  && !searched) {
      const keyword = {
        $or: [
          { model: { $regex: tag, $options: "i" } },
          { category: { $regex: tag, $options: "i" } },
        ],
      };
      //get the ads which are not sold or auction ended or user who gives the ad is not the same user who is logged in
      const ads = await Ad.find({
        $and: [
          { sold: false },
          { auctionEnded: false },
          { owner: { $ne: req.user.id } },
        ],
      }).find(keyword).populate("owner", "-password");

      res.status(200).json({
        success: true,
        message: "all ads",
        ads,
      });
    }
    if (searched && tag) {
      const keyword = {
        $and: [
          { category: { $regex: tag, $options: "i" } },
          {
            $or: [
              { productName: { $regex: searched, $options: "i" } },
              { brand: { $regex: searched, $options: "i" } },
              { model: { $regex: searched, $options: "i" } },
            ],
          },
        ],
      };

      const ads = await Ad.find({
        $and: [
          { sold: false },
          { auctionEnded: false },
          { owner: { $ne: req.user.id } },
        ],
      }).find(keyword).populate("owner", "-password");

      res.status(200).json({
        success: true,
        message: "all ads",
        ads,
      });
    }

    if (!searched && !tag) {
      const ads = await Ad.find({
        $and: [
          { sold: false },
          { auctionEnded: false },
          { owner: { $ne: req.user.id } },
        ],
      }).populate("owner", "-password");

      res.status(200).json({
        success: true,
        message: "all ads",
        ads,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const adDetails: RequestHandler = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate("owner", "-password");
        res.status(200).json({
            success: true,
            message: "ad details",
            ad,
        });
    } catch (err) {
        res.status(500).json({
            message: "error",
            err,
        });
    }
};


export const getUserAds: RequestHandler = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const getSoldProducts: RequestHandler = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};
