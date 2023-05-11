const { MongoClient } = require('mongodb');

exports.dbMiddleware = async (req, res, next) => {
  res.locals.db = await dbService();
  next()
}

const dbService = async () =>  {

  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect()

  return {
    select(query = {}) {
      return new Promise(async (resolve, reject) => {
        client
          .db('cinema')
          .collection('movies')
          .find(query)
          .toArray()
          .then(data => {
            resolve(data)
          })
      })
    },

    create(body = {}) {
      return new Promise(async (resolve, reject) => {
        client
          .db('cinema')
          .collection('movies')
          .insertOne(body)
          .then(data => {
            resolve(data)
          })
      })
    },

    update(query = {}, body = {}) {
      return new Promise(async (resolve, reject) => {
        client
          .db('cinema')
          .collection('movies')
          .updateOne(query, { $set: body })
          .then(data => {
            resolve(data)
          })
      })
    },

    delete(query = {}) {
      return new Promise(async (resolve, reject) => {
        client
          .db('cinema')
          .collection('movies')
          .deleteOne(query)
          .then(data => {
            resolve(data)
          })
      })
    },

    // create(_data) {
    //   const maxID = json.reduce((acc, { id }) => { if (acc < id) return id }, 0);

    //   console.log(maxID)

    //   if (!("id" in _data))
    //     _data.id = maxID + 1;

    //   json.push(_data);

    //   return _data;
    // },

    // update(_id, _data) {
    //   if ("id" in _data)
    //     delete _data["id"];

    //   const dataIndex = json.findIndex(({ id }) => id == _id);
    //   json[dataIndex] = {
    //     id: json[dataIndex].id,
    //     name: {
    //       ...json[dataIndex].name,
    //       ..._data.name
    //     },
    //     type: [
    //       ...json[dataIndex].type,
    //       ..._data.type
    //     ],
    //     base: {
    //       ...json[dataIndex].base,
    //       ..._data.base
    //     }
    //   };

    //   return json[dataIndex];
    // },

    // delete(_id) {
    //   const dataIndex = json.findIndex(({ id }) => id == _id);
    //   json.splice(dataIndex, 1);
    // }
  }
}