import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { tokenGenertion } from "../lib/utlis.js";
import cloudinary from "../lib/cloudinay.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  console.log(email, fullName, password, "email, fullName, password");

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Invaild Data" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password at least 6 characters." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashPassword,
    });
    console.log(newUser, "newUser==========>");

    if (newUser) {
      //jwt
      tokenGenertion(newUser?._id, res);
      console.log("===============newUser==========>");
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log("error in signup controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }
    tokenGenertion(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("error in logout controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    console.log(uploadResponse, "uploadResponse==============>");

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    console.log("error in update profile controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    // console.log(req.user ,"req.User============>");

    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
