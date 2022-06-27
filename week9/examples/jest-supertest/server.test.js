const supertest = require("supertest");
const app = require("./server");

describe("Tester för /", () => {
  test("GET /", (done) => {
    supertest(app)
      .get("/")
      .expect(200) // Statuskoden
      .expect("Content-Type", "application/json; charset=utf-8") // Headers
      .expect((res) => {
        return res.body === "Hello World";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("POST /", (done) => {
    supertest(app)
      .post("/")
      .send({ message: "Hello Server" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect((res) => {
        return res.body.message === "Hello Server";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
