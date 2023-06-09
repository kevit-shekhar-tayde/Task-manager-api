const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup new user.", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Shekhar",
      email: "kevit.shekhar.tayde@gmail.com",
      password: "qwer1234",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Shekhar",
      email: "kevit.shekhar.tayde@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("qwer1234");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).not.toBeNull();

  // assertion for token
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non existant user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "sadvefvv",
    })
    .expect(400);
});

test("Should get a profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test("should not delete account for unauthorized user.", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload an avatar", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg");
  expect(200);

  const user = await User.findById(userOne._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Jess",
    })
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.name).toEqual("Jess");
});

test("Should not update invalid user field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Delhi",
    })
    .expect(400);
});
