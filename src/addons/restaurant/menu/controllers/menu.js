// const { ErrorHandler } = require("../../../../helpers/errors");
const { ErrorHandler } = require("../../../../helpers/errors");
const MenuModel = require("../models/menu");
const { groupMenuByMarchant } = require("../utils");

const createMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.create(req.body);
    menu.save();
    res.send({
      status: true,
      message: "Menu created successfully",
      menu,
    });
  } catch (error) {
    next(error);
  }
};

const menuByMarchant = async (req, res, next) =>{
try {
   const menus = await groupMenuByMarchant()
   res.send({
     status: true,
     message: "Menus fetched by marchant",
     menus
   })  
} catch (error) {
  next(error)
}
}

const getAllMenu = async (req, res, next) => {
  try {
    let { page } = req.query
    if(!page){
      page = 1
    }
    const size = 5
    const limit = parseInt(size)
    const skip = (page -1) * size
    const total_menu = await MenuModel.find().populate('category')
    const menu = await MenuModel.find().populate('category').limit(limit).skip(skip)
    res.send({
      status: true,
      message: "All menu fetched successfully",
      menu,
      total_menu: total_menu.length,
      per_page: size
    });
  } catch (err) {
    next(err);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.findById(req.params.id);
    if (menu) {
      res.send({
        status: true,
        message: "Menu fetched successfully",
        menu,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.findByIdAndUpdate(req.params.id, req.body);
    if (menu) {
      res.send({
        status: true,
        message: "Menu updated successfully",
        menu,
      });
    } else {
      throw new Error("No record found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.findByIdAndDelete(req.params.id);
    if (menu) {
      res.send({
        status: true,
        message: "Menu deleted successfully",
        menu,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMenu,
  getAllMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  menuByMarchant
};
