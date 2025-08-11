
const User = require("../models/user");

const getUsers = (request, response) => {
  return User.find({})
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((err) => response.status(500).send(err.message));
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      if (!user) return response.status(404).send("User not found");
      response.status(200).send(user);
    })
    .catch((err) => response.status(500).send(err.message));
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndUpdate(user_id, { ...request.body}, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) return response.status(404).send("User not found");
      response.status(200).send(updatedUser);
    })
    .catch((err) => response.status(500).send(err.message));
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
    .then(() => {
      response.status(200).send("Success");
    })

    .catch((err) => response.status(500).send(err.message));
};

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((createdUser) => {
      response.status(201).send(createdUser);
    })
    .catch((err) => response.status(500).send(err.message));
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
};