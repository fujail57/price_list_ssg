import { response } from "express";
import prisma from "../DB/db.config.js";

export const get_posts = async (req, res) => {
  const posts = await prisma.post.findMany({});

  return res.json({ status: 200, data: posts });
};

// create_post
export const create_post = async (req, res) => {
  const { user_id, title, description } = req.body;
  const new_post = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });

  return res.json({ status: 200, data: new_post, message: "New Post created" });
};

// get_post
export const get_post = async (req, res) => {
  const post_id = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(post_id),
    },
  });

  return res.json({ status: 200, data: post });
};

// update_post
export const update_post = async (req, res) => {
  const { title, description } = req.body;
  const post_id = req.params.id;
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },

    data: {
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    message: `Post with id ${post_id} has updated successfully`,
  });
};

// delete_post
export const delete_post = async (req, res) => {
  const post_id = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(post_id),
    },
  });

  return res.json({
    status: 200,
    message: `Post: ${post_id} has been delete successfully`,
  });
};

// Post filtering
export const get_post_filter = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comment: {
        select: {
          user_id: true,
          comment: true,
        },
      },
    },

    orderBy: {
      id: "desc",
    },

    // filter
    where: {
      // comment_count: {
      //   gte: 0
      // }
      // title: {
      //   startsWith: "next"
      // }
      // title: {
      //   endsWith: `tut`
      // }

      OR: [
        {
          title: {
            startsWith: "tut",
          },
        },
        {
          title: {
            endsWith: "tut",
          },
        },
      ],
    },
  });

  return res.json({ status: 200, data: posts });
};

// To search the post-----------------------------------------------
export const search_post = async (req, res) => {
  const query = req.query.q;

  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });

  return res.json({ status: 200, data: posts });
};

// Pagination-----------------------------------------------
// http://localhost:3000/api/post/pagination?limit=4
// http://localhost:3000/api/post/pagination?limit=4&page=2
// http://localhost:3000/api/post/pagination?page=2
export const pagination_post = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;

  // condition
  if (page <= 0) {
    page = 1;
  }

  if (limit <= 0 || limit > 100) {
    limit = 10;
  }

  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
  });

  // To get the total post count
  const post_count = await prisma.post.count();
  const total_pages = await Math.ceil(post_count / limit);

  return res.json({
    status: 200,
    data: posts,
    meta: { total_pages, currentPage: page, limit: limit },
  });
};
