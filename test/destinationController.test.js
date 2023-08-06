import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server/server.js";
chai.should();
chai.use(chaiHttp);
let destinationId;
describe("Destination Controller", () => {
  const destination = {
    name: "Bali",
    description: "Beautiful island in Indonesia",
    imageUrl: ["img1.jpg", "img2.jpg"],
  };

  // Aquí está tu token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4MWE1NDcyYWQ0ZTkyYzgwMDhmM2EiLCJlbWFpbCI6ImVkdTE0OTM3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDIyMTU1MSwiZXhwIjoxNjkwNjY3OTUxfQ.6uKgeSHeTv_JsDdYfcciDRSNA52meb7_lNvpGpRkIIA';

  describe("/POST destinations", () => {
    it("it should POST a destination", async () => {
      const res = await chai
        .request(app)
        .post("/destinations")
        .set('Authorization', `${token}`) 
        .send(destination);
      res.should.have.status(200);
      res.body.should.be.a("object");
      destinationId = res.body._id;  // Guardamos el ID para las pruebas futuras
    });
  });

  describe("/GET destinations", () => {
    it("it should GET all destinations", async () => {
      const res = await chai
        .request(app)
        .get("/destinations")
        .set('Authorization', `Bearer ${token}`);
      res.should.have.status(200);
      res.body.should.be.a("array");
    });
  });

  describe("/PUT destinations", () => {
    it("it should UPDATE a destination", async () => {
      const updatedDestination = { name: "Updated Name" };
      const res = await chai
        .request(app)
        .put(`/destinations/${destinationId}`)
        .set('Authorization', `${token}`)
        .send(updatedDestination);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.name.should.be.equal("Updated Name");
    });
  });

  describe("/DELETE destinations", () => {
    it("it should DELETE a destination", async () => {
      const res = await chai
        .request(app)
        .delete(`/destinations/${destinationId}`)
        .set('Authorization', `${token}`);
      res.should.have.status(200);
    });
  });
});
