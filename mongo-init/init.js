db = db.getSiblingDB("orar"); // or your DB name

db.users.insertMany([
  {
    username: "Andreas Batman",
    email: "user@uab.ro",
    authentication: {
      password: "$2b$10$ZEilJIEicTEJnCSwAiYcqehzLQxSQE9M8OloRQ.TqKVax0ITPKT0a",
    },
  },
  {
    username: "Fernando Aquaman",
    email: "test@uab.ro",
    authentication: {
      password: "$2b$10$G0ndLN0Cp4l8peG1oo.Uee/BfDvfoRwX0G/MrNgtsI.i1fQqydzUi",
    },
  },
]);
