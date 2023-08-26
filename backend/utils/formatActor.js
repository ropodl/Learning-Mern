exports.formatActor = (actor) => {
  const { name, gender, about, _id, avatar } = actor;

  return {
    id: _id,
    name,
    about,
    gender,
    avatar: avatar?.url,
  };
};
