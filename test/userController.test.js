import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server/server.js";
import userModel from "../src/api/models/userSchema.js";
import bookingModel from "../src/api/models/bookingsSchema.js";
import notificationModel from "../src/api/models/notificationsSchema.js";
import reviewModel from "../src/api/models/reviewsSchema.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("User API", () => {
  let testUser;
  let newBooking;
  let newNotification;
  let newReview;
  const token = "YOUR_TEST_TOKEN"; // Reemplaza esto con el token válido para las pruebas

  before(async () => {
    testUser = await userModel.create({
      email: "test@gmail.com",
      password: "123456",
      firstName: "John",
      lastName: "Doe",
      // Otros campos relevantes del usuario...
    });

    newBooking = await bookingModel.create({
      trip: "64be412fe4f5107caf594ca8",
      user: testUser._id, // Asignar el _id del usuario de prueba
      bookingDate: Date.now(),
      paymentStatus: "Paid",
    });

    newNotification = await notificationModel.create({
      userId: testUser._id, // Asignar el _id del usuario de prueba
      message: "This is a test notification",
      read: false,
    });

    newReview = await reviewModel.create({
      trip: "64be412fe4f5107caf594ca8",
      user: testUser._id, // Asignar el _id del usuario de prueba
      reviewText: "This is a test review",
      rating: 5,
    });

    console.log("testUser created:", testUser);
    console.log("booking:", newBooking);
  });

  after(async () => {
    await userModel.deleteOne({ _id: testUser._id });
    console.log("testUser deleted");
  });

  // Test the GET all users route
  describe("GET /users", () => {
    it("should get all users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          done();
        });
    });
  });

  // Test the update user route
  describe("PUT /users/:id", () => {
    it("should update the user", (done) => {
      chai
        .request(server)
        .put(`/users/${testUser._id}`)
        .set("Authorization", `${token}`)
        .send({ firstName: "UpdatedName" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.firstName).to.equal("UpdatedName");
          done();
        });
    });
  });

  // Test the delete user route
  describe("DELETE /users/:id", () => {
    it("should delete the user and associated documents", async () => {
      const res = await chai
        .request(server)
        .delete(`/users/${testUser._id}`)
        .set("Authorization", `${token}`);
      expect(res).to.have.status(200);

      // Comprueba que los documentos asociados también se han eliminado
      const booking = await bookingModel.findById(newBooking._id);
      expect(booking).to.be.null;

      const notification = await notificationModel.findById(
        newNotification._id
      );
      expect(notification).to.be.null;

      const review = await reviewModel.findById(newReview._id);
      expect(review).to.be.null;
    });
  });
});

describe("Auth API", () => {
  let userID;

  // Let's save a test user before each test
  beforeEach((done) => {
    const testUser = {
      email: "testuser@gmail.com",
      password: "Test@123",
      firstName: "Test",
      lastName: "User",
      role: "client",
    };

    userModel.create(testUser).then((user) => {
      userID = user._id;
      done();
    });
  });

  // Clean up the test user after each test
  afterEach((done) => {
    userModel.deleteOne({ _id: userID }).then(() => done());
  });

  // Test the login route

  // Test the register route
  describe("POST /register", () => {
    it("should register a new user and return a token", (done) => {
      chai
        .request(server)
        .post("/register")
        .send({
          email: "newuser@gmail.com",
          password: "Test@123",
          firstName: "New",
          lastName: "User",
          role: "client",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");

          // Clean up the newly registered user
          userModel
            .findOneAndDelete({ email: "newuser@gmail.com" })
            .then(() => done());
        });
    });
  });
  describe("POST /login", () => {
    it("should log the user in and return a token", (done) => {
      chai
        .request(server)
        .post("/login")
        .send({ email: "edu14937@gmail.com", password: "123456" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          done();
        });
    });
  });
});
