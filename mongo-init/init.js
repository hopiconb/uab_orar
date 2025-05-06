db = db.getSiblingDB("orar"); // or your DB name

db.users.insertMany([
  {
    _id: ObjectId("68161139d405ffabf1d861e0"),
    username: "Andreas Batman",
    email: "user@uab.ro",
    role: "moderator",
    authentication: {
      password: "$2b$10$ZEilJIEicTEJnCSwAiYcqehzLQxSQE9M8OloRQ.TqKVax0ITPKT0a",
    },
  },
  {
    _id: ObjectId("68181181d415afabf1d861d8"),
    username: "Fernando Aquaman",
    email: "test@uab.ro",
    role: "admin",
    authentication: {
      password: "$2b$10$G0ndLN0Cp4l8peG1oo.Uee/BfDvfoRwX0G/MrNgtsI.i1fQqydzUi",
    },
  },
]);

db.disciplines.insertMany([
  {
    name: "Tehnici avansate de programare",
    code: "INFO206",
    professor: "Kadar Mihaela",
    _id: ObjectId("6815e1d0326b4e8b1dfa566d"),
    __v: 0,
  },
  {
    name: "Tehnici de optimizare",
    code: "INFO208",
    professor: "Aldea Mihaela",
    _id: ObjectId("6815e1d0326b4e8b1dfbb26d"),
    __v: 0,
  },
]);

db.groups.insertMany([
  {
    year: 2,
    name: "Grupa 1",
    degreeId: ObjectId("6815ea755b9a1739152b174e"),
    _id: ObjectId("6815e2fa813106f25196e42d"),
    __v: 0,
  },
  {
    year: 2,
    name: "Grupa 2",
    degreeId: ObjectId("6815ea755b9a1739152b174e"),
    _id: ObjectId("6285e2af813106f25196e42d"),
    __v: 0,
  },
]);

db.degrees.insertMany([
  {
    name: "Informatica (licenta, lb. romana)",
    _id: ObjectId("6815ea755b9a1739152b174e"),
    facultyId: ObjectId("6815eabf6574dd7b809203ec"),
    __v: 0,
  },
]);

db.faculties.insertMany([
  {
    name: "Informatica si Inginerie",
    degreeId: [ObjectId("6815ea755b9a1739152b174e")],
    _id: ObjectId("6815eabf6574dd7b809203ec"),
    __v: 0,
  },
  {
    name: "Istorie, Litere si Stiinte ale Educatiei",
    degreeId: [],
    _id: ObjectId("6924fcbf6574bd1b809203ec"),
    __v: 0,
  },
  // {
  //   name: "Drept si Stiinte Sociale",
  // },
  // {
  //   name: "Teologie Ortodoxa",
  // },
  // {
  //   name: "Studii universitare de Doctorat",
  // },
  // {
  //   name: "Stiinte Economice",
  // },
]);

db.schedules.insertMany([
  {
    _id: ObjectId("6815e40d5fb2af0a94e3b9e6"),
    disciplineId: ObjectId("6815e1d0326b4e8b1dfa566d"),
    groupId: ObjectId("6815e2fa813106f25196e42d"),
    room: "A2",
    dayOfWeek: "Monday",
    startTime: "10:00",
    endTime: "12:00",
    createdBy: ObjectId("68161139d405ffabf1d861e0"),
    createdAt: ISODate("2025-05-03T09:38:21.169Z"),
    __v: 0,
  },
  {
    _id: ObjectId("6123b4af5fb2af0a94b3b9e6"),
    disciplineId: ObjectId("6815e1d0326b4e8b1dfbb26d"),
    groupId: ObjectId("6285e2af813106f25196e42d"),
    room: "LMN",
    dayOfWeek: "Monday",
    startTime: "12:00",
    endTime: "14:00",
    createdBy: ObjectId("68181181d415afabf1d861d8"),
    createdAt: ISODate("2025-05-06T09:38:21.169Z"),
    __v: 0,
  },
]);
