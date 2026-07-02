import { prisma } from "../config/db.js";

// export const create_category = async (req, res) => {
//   const { name } = req.body;
//   const new_category = await prisma.category.create({
//     data: {
//       name: name,
//     },
//   });

//   return res.status(201).json({
//     success: true,
//     message: "New Category created",
//     data: new_category,
//   });
// };

export const create_category = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    // isCategory exist?
    const existingCategory = await prisma.category.findUnique({
      where: {
        name,
      },
    });
    if (existingCategory) {
      return res
        .status(409)
        .json({ success: false, message: "Category already exist" });
    }

    // create category
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get categories

export const get_categories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({});

    return res.json({ data: categories });
  } catch (error) {
    return res.json({ message: "Server error:", error });
  }
};

// Get category
export const get_category = async (req, res) => {
  try {
    const category_id = req.params.id;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(category_id),
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Category found", data: category });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// Update category
export const update_category = async (req, res) => {
  try {
    const category_id = req.params.id;
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "No category found" });
    }

    await prisma.category.update({
      where: {
        id: Number(category_id),
      },
      data: {
        name: name,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: `Category updated successfully` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const delete_category = async (req, res) => {
  try {
    const category_id = req.params.id;
    await prisma.category.delete({
      where: {
        id: Number(category_id),
      },
    });

    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't delete! Internal server error" });
  }
};
