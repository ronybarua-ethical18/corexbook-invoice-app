const User = require("../models/users");
const groupByMarchant = async () => {
  const users = await User.aggregate([
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
          $first: "$marchant.company",
        },
        users: {
          $push: {
            _id: "$_id",
            first_name: "$first_name",
            last_name: "$last_name",
            email: "$email",
            role: "$role",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  return users;
};

module.exports = { groupByMarchant };
