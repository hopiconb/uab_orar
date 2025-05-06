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
    name: "Arhitectura sistemelor",
    code: "INFO103",
    professor: "Cucu Ciprian",
    _id: ObjectId("6213e1d0326b4e8b1dfa56d8"),
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
  {
    year: 1,
    name: "Grupa 3",
    degreeId: ObjectId("6815ea755b9a1739152b174e"),
    _id: ObjectId("6816f5c32a7b91d43c8e0a1f"),
    __v: 0,
  },
  {
    year: 3,
    name: "Grupa 1",
    degreeId: ObjectId("6815ea755b9a1739152b174e"),
    _id: ObjectId("6287a9e15f4d8b29a1c3e572"),
    __v: 0,
  },
]);

db.degrees.insertMany([
  {
    name: "Informatica (licenta, lb. romana)",
    _id: ObjectId("6815ea755b9a1739152b174e"),
    facultyId: ObjectId("6815eabf6574dd7b809203ec"),
    duration: 3,
    __v: 0,
  },
  {
    name: "Informatica (licenta, lb. engleza)",
    _id: ObjectId("2395ebb55b1a1739152b812a"),
    facultyId: ObjectId("6815eabf6574dd7b809203ec"),
    duration: 3,
    __v: 0,
  },
  {
    name: "Ingineria mediului",
    _id: ObjectId("6128ba251b9a1739152b122a"),
    facultyId: ObjectId("6815eabf6574dd7b809203ec"),
    duration: 4,
    __v: 0,
  },
  {
    // Specializari Istorie, Litere si Stiinte ale Educatiei
    name: "Limba și literatura română - Limba și literatura engleză",
    _id: ObjectId("4231bc211b9a1791113c12da"),
    facultyId: ObjectId("6924fcbf6574bd1b809203ec"),
    duration: 4,
    __v: 0,
  },
  {
    name: "Istorie",
    _id: ObjectId("5128bc211b9a1231113c18ab"),
    facultyId: ObjectId("6924fcbf6574bd1b809203ec"),
    duration: 3,
    __v: 0,
  },
]);

db.faculties.insertMany([
  {
    name: "Informatica si Inginerie",
    degreeId: [
      ObjectId("6815ea755b9a1739152b174e"),
      ObjectId("2395ebb55b1a1739152b812a"),
      ObjectId("6128ba251b9a1739152b122a"),
    ],
    _id: ObjectId("6815eabf6574dd7b809203ec"),
    __v: 0,
  },
  {
    name: "Istorie, Litere si Stiinte ale Educatiei",
    degreeId: [
      ObjectId("4231bc211b9a1791113c12da"),
      ObjectId("5128bc211b9a1231113c18ab"),
    ],
    _id: ObjectId("6224fcbf6574bd1b809203ec"),
    __v: 0,
  },
  {
    name: "Drept si Stiinte Sociale",
    degreeId: [],
    _id: ObjectId("2924fcbf6574bd1b709213ab"),
    __v: 0,
  },
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
    groupId: ObjectId("6815e2fa813106f25196e42d"), // grupa 1
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
    groupId: ObjectId("6285e2af813106f25196e42d"), // grupa 2
    room: "LMN",
    dayOfWeek: "Monday",
    startTime: "12:00",
    endTime: "14:00",
    createdBy: ObjectId("68181181d415afabf1d861d8"),
    createdAt: ISODate("2025-05-06T09:38:21.169Z"),
    __v: 0,
  },
  {
    _id: ObjectId("4123a4bc5fb2af0a94b3b4b6"),
    disciplineId: ObjectId("6815e1d0326b4e8b1dfbb26d"),
    groupId: ObjectId("6815e2fa813106f25196e42d"), // grupa 1
    room: "LMN",
    dayOfWeek: "Tuesday",
    startTime: "08:00",
    endTime: "12:00",
    createdBy: ObjectId("68181181d415afabf1d861d8"),
    createdAt: ISODate("2025-02-06T09:38:21.169Z"),
    __v: 0,
  },
  {
    _id: ObjectId("629ab4af5ab2bf0a94b3b9e2"),
    disciplineId: ObjectId("6213e1d0326b4e8b1dfa56d8"),
    groupId: ObjectId("6285e2af813106f25196e42d"), // grupa 2
    room: "A6",
    dayOfWeek: "Wednesday",
    startTime: "08:00",
    endTime: "10:00",
    createdBy: ObjectId("68181181d415afabf1d861d8"),
    createdAt: ISODate("2025-02-06T09:38:21.169Z"),
    __v: 0,
  },
]);
