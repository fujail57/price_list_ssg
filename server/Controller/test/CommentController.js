import prisma from "../DB/db.config.js";

export const get_comments = async (req, res) => {
  const comments = await prisma.comment.findMany({});
  return res.json({ status: 200, data: comments });
};

export const get_comment = async (req, res) => {
  const comment_id = req.params.id;
  const comment = await prisma.comment.findUnique({
    where: {
      id: comment_id,
    },
  });
  return res.json({ status: 200, data: comment });
};

export const create_comment = async (req, res) => {
  const { post_id, user_id, comment } = req.body;

  // Increment comment count in post by 1
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const new_comment = await prisma.comment.create({
    data: {
      post_id: Number(post_id),
      user_id: Number(user_id),
      comment: comment,
    },
  });

  return res.json({
    status: 200,
    data: new_comment,
    message: `New comment added successfully`,
  });
};

export const update_comment = async (req, res) => {
  const comment_id = req.params.id;
  const { comment } = req.body;
  await prisma.comment.update({
    where: {
      id: comment_id,
    },
    data: {
      comment: comment,
    },
  });
  return res.json({
    status: 200,
    message: `comment with id ${comment_id} has been updated successfully`,
  });
};

export const delete_comment = async (req, res) => {
  const comment_id = req.params.id;
  const { post_id } = req.body;

  // ddecrement comment count in post on delete
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });

  await prisma.comment.delete({
    where: {
      id: comment_id,
    },
  });

  return res.json({
    status: 200,
    message: `Comment with id ${comment_id} has been deleted successfully`,
  });
};
