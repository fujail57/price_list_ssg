import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({ status: 400, message: "User already exist!" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({ status: 200, data: newUser, message: "New User created" });
};

// Update User---------------------------------------------
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });

  return res.json({ status: 200, message: "User updated successfully" });
};

// get_all_user
export const get_all_user = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json({ status: 200, data: users });
};

// get_all_user_with_post
export const get_all_user_with_post = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      post: {
        select: {
          title: true,
          description: true,
          comment_count: true,
        },
      },
    },
  });
  return res.json({ status: 200, data: users });
};

// get_user_by_id
export const get_user_by_id = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user });
};

// delete_user
export const delete_user = async (req, res) => {
  const userId = req.params.id;

  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({
    status: 200,
    message: `User with id ${userId} has been deleted!`,
  });
};

// get_all_user_with_post_count

export const get_all_user_with_post_count = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      _count:{
        select: {
          post: true,
          comment: true
        }
      }
    }
  });
  return res.json({ status: 200, data: users });
};

// export const get_all_user_with_post_count = async (req, res) => {
//   const users = await prisma.user.findMany({
//     include: {
//       _count: {
//         select: {
//           post: true,
//           comment: true,
//         },
//       },
//     },
//   });
//   return res.json({ status: 200, data: users });
// };