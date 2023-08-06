import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server/server.js";

chai.should();
chai.use(chaiHttp);

describe("Trips Controller", () => {
  const trip = {
    title: "Test Trip",
    destinations: ["64be3e955cc3ebc6f59af7f5"],
    startDate: new Date(),
    endDate: new Date(),
    price: 500,
    availableSeats: 10,
    description: "This is a test trip",
    imageUrls: ["https://example.com/test.jpg"],
    reviews: [],
    hashtags: ["#test"],
    ecoRating: 3
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4MWE1NDcyYWQ0ZTkyYzgwMDhmM2EiLCJlbWFpbCI6ImVkdTE0OTM3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDIyMTU1MSwiZXhwIjoxNjkwNjY3OTUxfQ.6uKgeSHeTv_JsDdYfcciDRSNA52meb7_lNvpGpRkIIA';
  let tripId;

  describe("/POST trips", () => {
    it("it should POST a trip", async () => {
      const res = await chai
        .request(app)
        .post("/trips")
        .set('Authorization', `Bearer ${token}`)
        .send(trip);
      res.should.have.status(200);
      res.body.should.be.a("object");
      tripId = res.body._id;
    });
  });

  describe("/GET trips", () => {
    it("it should GET all trips", async () => {
      const res = await chai
        .request(app)
        .get("/trips")
        .set('Authorization', `Bearer ${token}`);
      res.should.have.status(200);
      res.body.should.be.a("array");
    });
  });

  describe("/PUT trips", () => {
    it("it should UPDATE a trip", async () => {
      const updatedTrip = { 
        title: "Updated Test Trip", 
        price: 600,
        description: "This is an updated test trip",
      };
      const res = await chai
        .request(app)
        .put(`/trips/${tripId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTrip);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.title.should.be.equal("Updated Test Trip");
      res.body.price.should.be.equal(600);
      res.body.description.should.be.equal("This is an updated test trip");
    });
  });

  describe("/DELETE trips", () => {
    it("it should DELETE a trip", async () => {
      const res = await chai
        .request(app)
        .delete(`/trips/${tripId}`)
        .set('Authorization', `Bearer ${token}`);
      res.should.have.status(200);
    });
  });
});
