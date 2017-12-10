const selectUserFields =
  ({ username, email, name, avatar, cover, tags }) =>
    ({ username, email, name, avatar, cover, tags });

const selectPostFields =
  ({ _id: id, createdAt, author, location, likes, comments, content, image }) =>
    ({ id, createdAt, author, location, likes, comments, content, image });

const selectCommentFields =
  ({ _id: id, createdAt, author, likes, content }) =>
    ({ id, createdAt, author, likes, content });

module.exports = {
  selectUserFields,
  selectPostFields,
  selectCommentFields,
};
