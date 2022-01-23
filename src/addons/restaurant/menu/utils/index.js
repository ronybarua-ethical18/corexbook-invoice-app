const Menu = require("../models/menu")
const groupMenuByMarchant = async () => {
  const menus = await Menu.aggregate([
    {
      $lookup: {
        from: "marchants",
        localField: "marchant",
        foreignField: "_id",
        as: "marchant",
      },
    },
    {
      $unwind: "$marchant",
    },
    {
      $group: {
        _id: "$marchant._id",
        marchant: {
          $first: "$marchant.email",
        },
        menu: {
          $push: {
            _id: "$_id",
            category: "$category",
            price: "$price",
            title: "$title",
            logo: "$logo"
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]); 
  return menus;
};

module.exports = { groupMenuByMarchant };
