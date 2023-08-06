import chai from "chai";
import chaiHttp from "chai-http";
import userModel from "../src/api/models/userSchema.js";
import { Types } from "mongoose";

const { ObjectId } = Types;
import app from "../src/server/server.js";
chai.should();
chai.use(chaiHttp);

describe("Booking Controller", () => {
  let bookingId;

  afterEach(async () => {
    if (bookingId) {
      // Realizamos el DELETE para eliminar el booking creado en la prueba "/POST bookings"
      await chai
        .request(app)
        .delete(`/bookings/${bookingId}`)
        .set("Authorization", `${token}`);
    }
  });

  const booking = {
    trip: "64be412fe4f5107caf594ca8",
    user: "64b81a5472ad4e92c8008f3a",
    paymentStatus: "Paid",
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4MWE1NDcyYWQ0ZTkyYzgwMDhmM2EiLCJlbWFpbCI6ImVkdTE0OTM3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDIyMTU1MSwiZXhwIjoxNjkwNjY3OTUxfQ.6uKgeSHeTv_JsDdYfcciDRSNA52meb7_lNvpGpRkIIA";

  describe("/POST bookings", () => {
    it("it should POST a booking and update the user's bookings", async () => {
      const res = await chai
        .request(app)
        .post("/bookings")
        .set("Authorization", `${token}`)
        .send(booking);
      res.should.have.status(200);
      res.body.should.be.a("object");
      bookingId = res.body._id; // Asignamos el ID del booking creado a la variable externa bookingId

      // Consulta el modelo de User para obtener el usuario actualizado
      const user = await userModel.findById(booking.user);

      // Verifica que el usuario no sea null
      chai.expect(user).to.not.be.null;

      // Verifica que el ID del booking esté presente en el array de bookings del usuario
      chai.expect(user.bookings).to.include(bookingId);
    });
  });

  describe("/GET bookings", () => {
    it("it should GET all bookings", async () => {
      const res = await chai
        .request(app)
        .get("/bookings")
        .set("Authorization", `Bearer ${token}`);
      res.should.have.status(200);
      res.body.should.be.a("array");
    });
  });

  describe("/PUT bookings", () => {
    it("it should UPDATE a booking", async () => {
      // Realizamos el POST para crear un nuevo booking y obtener su ID
      const createRes = await chai
        .request(app)
        .post("/bookings")
        .set("Authorization", `${token}`)
        .send(booking);

      // Obtenemos el ID del booking creado
      bookingId = createRes.body._id;

      // Realizamos el PUT para actualizar el booking recién creado
      const updatedBooking = { paymentStatus: "Unpaid" };
      const updateRes = await chai
        .request(app)
        .put(`/bookings/${bookingId}`)
        .set("Authorization", `${token}`)
        .send(updatedBooking);

      updateRes.should.have.status(200);
      updateRes.body.should.be.a("object");
      updateRes.body.paymentStatus.should.be.equal("Unpaid");
    });
  });

  describe("/DELETE bookings", () => {
    it("it should DELETE a booking and update the user's bookings", async () => {
      // Realizamos el POST para crear un nuevo booking y obtener su ID
      const createRes = await chai
        .request(app)
        .post("/bookings")
        .set("Authorization", `${token}`)
        .send(booking);

      // Obtenemos el ID del booking creado
      bookingId = createRes.body._id;

      // Realizamos el DELETE para eliminar el booking recién creado
      const deleteRes = await chai
        .request(app)
        .delete(`/bookings/${bookingId}`)
        .set("Authorization", `${token}`);

      deleteRes.should.have.status(200);

      // Consulta el modelo de User para obtener el usuario actualizado después de eliminar el booking
      const user = await userModel.findById(booking.user);

      // Verifica que el usuario no sea null
      chai.expect(user).to.not.be.null;

      // Verifica que el ID del booking no esté presente en el array de bookings del usuario
      chai.expect(user.bookings).to.not.include(bookingId);
    });
  });
});
