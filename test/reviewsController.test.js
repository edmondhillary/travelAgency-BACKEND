import chai from "chai";
import chaiHttp from "chai-http";
import userModel from "../src/api/models/userSchema.js";
import tripModel from "../src/api/models/tripsSchema.js";
import reviewModel from "../src/api/models/reviewsSchema.js";
import { Types } from "mongoose";
const { ObjectId } = Types;
import app from "../src/server/server.js";

chai.should();
chai.use(chaiHttp);

describe("Review Controller", () => {
  let reviewId;
  const tripId = "64be412fe4f5107caf594ca8";
  const userId = "64b81a5472ad4e92c8008f3a";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4MWE1NDcyYWQ0ZTkyYzgwMDhmM2EiLCJlbWFpbCI6ImVkdTE0OTM3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDIyMTU1MSwiZXhwIjoxNjkwNjY3OTUxfQ.6uKgeSHeTv_JsDdYfcciDRSNA52meb7_lNvpGpRkIIA";

  afterEach(async () => {
    if (reviewId) {
      // Realizamos el DELETE para eliminar la review creada en la prueba "/POST reviews"
      await reviewModel.findByIdAndDelete(reviewId);
    }
  });

  const review = {
    trip: tripId,
    user: userId,
    reviewText: "Great trip!",
    rating: 5,
  };

  describe("/POST reviews", () => {
    it("it should POST a review", async () => {
      const res = await chai
        .request(app)
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(review);
      res.should.have.status(200);
      res.body.should.be.a("object");
      reviewId = res.body._id; // Asignamos el ID de la review creada a la variable externa reviewId

      // Verificar que el objeto trip no sea null antes de acceder a la propiedad 'reviews'
      const trip = await tripModel.findById(tripId);
      chai.expect(trip).to.not.be.null;
      chai.expect(trip.reviews).to.include(reviewId);
    });
  });

  describe("/GET reviews", () => {
    it("it should GET all reviews", async () => {
      const res = await chai
        .request(app)
        .get("/reviews")
        .set("Authorization", `Bearer ${token}`);
      res.should.have.status(200);
      res.body.should.be.a("array");
    });
  });

  describe("/PUT reviews", () => {
    it("it should UPDATE a review", async () => {
      // Realizamos el POST para crear una nueva review y obtener su ID
      const createRes = await chai
        .request(app)
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(review);

      // Obtenemos el ID de la review creada
      reviewId = createRes.body._id;

      // Realizamos el PUT para actualizar la review recién creada
      const updatedReview = { reviewText: "Amazing trip!", rating: 4.5 };
      const updateRes = await chai
        .request(app)
        .put(`/reviews/${reviewId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedReview);

      updateRes.should.have.status(200);
      updateRes.body.should.be.a("object");
      updateRes.body.reviewText.should.be.equal("Amazing trip!");
      updateRes.body.rating.should.be.equal(4.5);

      // Verificar que el objeto trip no sea null antes de acceder a la propiedad 'reviews'
      const trip = await tripModel.findById(tripId);
      chai.expect(trip).to.not.be.null;
      chai.expect(trip.reviews).to.include(reviewId);
    });
  });

  describe("/DELETE reviews", () => {
    it("it should DELETE a review", async () => {
      // Realizamos el POST para crear una nueva review y obtener su ID
      const createRes = await chai
        .request(app)
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(review);

      // Obtenemos el ID de la review creada
      reviewId = createRes.body._id;

      // Realizamos el DELETE para eliminar la review recién creada
      const deleteRes = await chai
        .request(app)
        .delete(`/reviews/${reviewId}`)
        .set("Authorization", `Bearer ${token}`);
        
      deleteRes.should.have.status(200);

      // Verificar que el objeto trip no sea null antes de acceder a la propiedad 'reviews'
      const trip = await tripModel.findById(tripId);
      chai.expect(trip).to.not.be.null;
      chai.expect(trip.reviews).to.not.include(reviewId);
    });
  });
});
