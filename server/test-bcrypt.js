const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // adjust path if needed

mongoose
  .connect("mongodb://127.0.0.1:27017/wedlocater") // replace with your DB name
  .then(async () => {
    const hashedPassword = await bcrypt.hash("Abhi1234", 10);

    await User.create({
      name: "Awanish Singh",
      email: "awanishsingh0325@gmail.com",
      password: await bcrypt.hash("Abhi1234", 10),
      role: "admin",
    });

    console.log("✅ Admin user created!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed:", err);
  });
