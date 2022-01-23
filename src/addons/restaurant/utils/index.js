const MenuModel = require("../menu/models/menu");
const groupByCategory = async () => {
  const menus = await MenuModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $group: {
        _id: "$category._id",
        category: {
          $first: "$category.title",
        },
        items: {
          $push: {
            _id: "$_id",
            title: "$title",
            price: "$price",
            logo: "$logo",
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

module.exports = { groupByCategory };
