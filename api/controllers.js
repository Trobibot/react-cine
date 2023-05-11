const { ObjectId } = require('mongodb');

exports.rootController = (req, res) => {
  res.status(200).json("Librart API v0.1");
}

exports.getMoviesController = async (req, res) => {
  res.status(200).json(await res.locals.db.select())
}

exports.getMovieByIdController = async (req, res) => {
  res.status(200).json(await res.locals.db.select({ _id: new ObjectId(req.params.id) }))
}

exports.createMovieController = async (req, res) => {
  res.status(200).json(await res.locals.db.create(req.body))
}

exports.updateMovieByIdController = async (req, res) => {
  res.status(200).json(await res.locals.db.update({ _id: new ObjectId(req.params.id) }, req.body))
}

exports.deleteMovieByIdController = async (req, res) => {
  res.status(200).json(await res.locals.db.delete({ _id: new ObjectId(req.params.id) }))
}