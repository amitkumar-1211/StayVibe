require("node:process").loadEnvFile();

const mongoose = require("mongoose");
const Home = require("../models/home");

const sampleHomes = [
  ["Sunny City Stay", 2400, "Mumbai", 4.8, "A bright, comfortable home close to local attractions."],
  ["Quiet Garden Home", 1800, "Pune", 4.6, "A relaxed stay with room to unwind after a day out."],
  ["Modern Weekend Flat", 3200, "Bengaluru", 4.9, "A modern home with convenient access to the city."],
  ["Warm Family Retreat", 2100, "Jaipur", 4.7, "A welcoming place for a comfortable family stay."],
  ["Lakeside Getaway", 2800, "Udaipur", 4.8, "A peaceful base for exploring the surrounding area."],
  ["Simple City Apartment", 1600, "Delhi", 4.5, "A practical and comfortable home for your city visit."],
  ["Relaxing Holiday Home", 2600, "Goa", 4.7, "A laid-back stay for a restful break."],
  ["Central Guest Home", 1900, "Hyderabad", 4.6, "A convenient home for work trips and short visits."],
].map(([houseName, price, location, rating, description], index) => ({
  houseName,
  price,
  location,
  rating,
  description,
  photoUrl: `/images/house${index + 1}.png`,
}));

async function seedHomes() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to your .env file.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const existingHomes = await Home.countDocuments();

  if (existingHomes > 0) {
    console.log(`Database already has ${existingHomes} homes; no sample homes were added.`);
    return;
  }

  await Home.insertMany(sampleHomes);
  console.log(`Added ${sampleHomes.length} sample homes using local images from public/images.`);
}

seedHomes()
  .catch((error) => {
    console.error("Could not seed sample homes:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
