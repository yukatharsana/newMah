const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../model/user");
const Shop = require("../model/shop");
const Artist = require("../model/Artist");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return next(new ErrorHandler("Authentication failed", 401));
    }

    try {
      req.user = await User.findById(decoded.id);
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      return next(new ErrorHandler("Authentication failed", 401));
    }
  });
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication failed", 401));
  }
});

exports.isArtist = catchAsyncErrors(async (req, res, next) => {
  const { artist_token } = req.cookies;

  if (!artist_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(artist_token, process.env.JWT_SECRET_KEY);
    req.artist = await Artist.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication failed", 401));
  }
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`User role (${req.user.role}) cannot access this resource!`, 403));
    }
    next();
  };
};
