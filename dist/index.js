"use strict";

var _data = _interopRequireDefault(require("./data.json"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n type Note {\n   title: String\n   id: ID\n   cover_titular: String\n   text: String\n\n }\n # The \"Query\" type is the root of all GraphQL queries.\n type Query {\n   notes: [Note]\n   note(id: ID!): Note\n }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// TypeDefs
var typeDefs = (0, _apolloServer.gql)(_templateObject());
var resolvers = {
  Query: {
    notes: function notes() {
      return _data["default"].notes;
    },
    note: function note(parent, args) {
      var id = args.id;
      return getNoteByID({
        id: id
      });
    }
  }
};

var getNoteByID = function getNoteByID(id) {
  var idNum = parseInt(id.id);
  return _data["default"].notes.filter(function (note) {
    return note.id === idNum;
  })[0];
};

var server = new _apolloServer.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.listen({
  port: process.env.PORT || 4000
}).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});
//# sourceMappingURL=index.js.map