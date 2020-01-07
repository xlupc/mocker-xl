const mongoose  = require('mongoose');
const ApiSchema = mongoose.Schema({
  // 接口主要内容
  name: {
    type: String,
    unique: false
  },
  desc: String,
  url: String,
  options: {
    method: String,
    // proxy: {
    //   type: Object,
    //   default: {
    //     mode: 0
    //   }
    // },
    // headers: {
    //   example: {},
    //   params: []
    // },
    params: {},
    // examples: {
    //   type: Object,
    //   default: {
    //     query: null,
    //     body: null,
    //     path: null
    //   }
    // },
    response: {},
    // responseIndex: {
    //   type: Number,
    //   default: 0
    // },
    delay: Number
  },
  createTime: {
    type: String,
    default: Date.now
  },
  modifiedTime: {
    type: String,
    default: Date.now
  },
})

module.exports = mongoose.model('Api', ApiSchema);

