import request from "supertest";

describe("User", () => {
  it("When calling the users route, you must return all registered users.", async () => {
    const query = `
      {
        users {
          name
          lastname
          email
        }
      }
    `;

    const res = await request("http://localhost:4000/")
      .post("/")
      .set("Accept", /json/)
      .send({ query })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.data.users[0]).toHaveProperty("name");
  });

  it("Should be able to edit a user", async () => {
    const mutation = `
      mutation {
        updateUser(id: "1", name: "test", lastname: "testing", email: "test@gmail.com" )
        {
          name
        }
      }
    `;

    const res = await request("http://localhost:4000/")
      .post("/")
      .set("Accept", /json/)
      .send({ query: mutation })
      .expect(200)
      .expect("Content-Type", /json/);

    console.log(res.body);
    expect(res.body.data.updateUser.name).toBe("test");
  });
});
