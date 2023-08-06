import chai from "chai";
import chaiHttp from "chai-http";
import notificationModel from "../src/api/models/notificationsSchema.js";
import app from "../src/server/server.js";
chai.should();
chai.use(chaiHttp);

describe("Notification Controller", () => {
  const notificationData = {
    userId: "64ba53c3ce744112917104b0",
    message: "This is a test notification",
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4MWE1NDcyYWQ0ZTkyYzgwMDhmM2EiLCJlbWFpbCI6ImVkdTE0OTM3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDIyMTU1MSwiZXhwIjoxNjkwNjY3OTUxfQ.6uKgeSHeTv_JsDdYfcciDRSNA52meb7_lNvpGpRkIIA";
    
  let notificationId;
  afterEach(async () => {
    // Remove the test notification document after each test
    if (notificationId) {
      await notificationModel.findByIdAndDelete(notificationId);
    }
  });

  describe("/POST notifications", () => {
    it("it should POST a notification", async () => {
      const res = await chai
        .request(app)
        .post("/notifications")
        .set("Authorization", `${token}`)
        .send(notificationData);
      res.should.have.status(200);
      res.body.should.be.a("object");
      notificationId = res.body._id; // We save the ID for future tests
    });
  });

  describe("/GET notifications", () => {
    it("it should GET all notifications of a user", async () => {
      const res = await chai
        .request(app)
        .get(`/notifications/${notificationData.userId}`)
        .set("Authorization", `Bearer ${token}`);
      res.should.have.status(200);
      res.body.should.be.a("array");
    });
  });

  describe("/PUT notifications", () => {
    it("it should mark a notification as read", async () => {
      const res = await chai
        .request(app)
        .put(`/notifications/${notificationId}/read`)
        .set("Authorization", `${token}`);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.read.should.be.equal(true);
    });
  });
});
