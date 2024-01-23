const express = require("express");
const router = express.Router();
const Artist = require("../model/Artist");
const authMiddleware = require("../middleware/auth");
const Appointment = require("../model/appointmentModel");
const User = require("../model/user");

router.post("/get-artist-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Artist info fetched successfully",
      data: artist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting artist info", success: false, error });
  }
});

router.post("/get-artist-info-by-id", authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findOne({ _id: req.body.artistId });
    res.status(200).send({
      success: true,
      message: "Artist info fetched successfully",
      data: artist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting artist info", success: false, error });
  }
});

router.post("/update-artist-profile", authMiddleware, async (req, res) => {
  try {
    const artist = await Artist.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Artist profile updated successfully",
      data: artist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting artist info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-artist-id",
  authMiddleware,
  async (req, res) => {
    try {
      const artist = await Artist.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ artistId: artist._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});

module.exports = router;
