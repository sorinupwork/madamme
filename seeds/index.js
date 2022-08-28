const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.hpsp90p.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 20;
    const camp = new Campground({
      author: "62d92278240a89658bd2148a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGdyb3VuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          filename: "YelpCamp/glf92ji093adn9bnzrrl",
        },
        {
          url: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          filename: "YelpCamp/bzfvxlj6ctdrotsxotiw",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum eum minima, unde voluptatum inventore? Ab illo temporibus odit illum earum, veritatis modi nam ex quaerat quis fugit! Nisi, debitis. ",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
