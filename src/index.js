import  notes from './data.json';
import { ApolloServer, gql } from 'apollo-server';

 // TypeDefs
 const typeDefs = gql`
 type Note {
   title: String
   id: ID
   cover_titular: String
   text: String

 }
 # The "Query" type is the root of all GraphQL queries.
 type Query {
   notes: [Note]
   note(id: ID!): Note
 }
`;


const resolvers = {
  Query: {
    notes: () => notes.notes,
    note: (parent, args) => {
      const {id} = args;
      return getNoteByID({id});
    }
  }
};
const getNoteByID = (id) => {
  const idNum = parseInt(id.id)
  return notes.notes.filter(note => {
      return note.id === idNum;
  })[0]
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});








