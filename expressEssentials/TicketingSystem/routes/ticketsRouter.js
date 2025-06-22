let express = require("express");
const {
  getAllTickets,
  getTicketsById,
  addNewTicket,
  updateTicketByID,
  deleteTicketByID,
  resolveTicketByID,
} = require("../controllers/ticketsController");
const { dataCheckMiddleware } = require("../middlewares/dataCheckMiddleware");

let ticketsRouter = express.Router();

// all the tickets
ticketsRouter.get("/all-tickets", getAllTickets);
// add new ticket
ticketsRouter.post("/add-ticket", dataCheckMiddleware, addNewTicket);
// get ticket by id
ticketsRouter.get("/ticket/:id", getTicketsById);
// update ticket by id
ticketsRouter.put("/update-ticket/:id", updateTicketByID);
// delete ticket by id
ticketsRouter.delete("/dlt-ticket/:id", deleteTicketByID);
// resolve ticket  by id
ticketsRouter.patch("/ticket/:id/resolve", resolveTicketByID);

module.exports = { ticketsRouter };
