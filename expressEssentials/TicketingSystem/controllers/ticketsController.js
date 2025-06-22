const { readData, writeFile, findIndex } = require("../models/ticketModel");

let getAllTickets = (req, res) => {
  let data = readData();
  if (data.length == 0) {
    return res.status(404).json({ message: "No tickets Available.." });
  }
  res.status(200).json(data);
};

let addNewTicket = (req, res) => {
  let newTicket = req.body;
  let data = readData();
  let id = data.length == 0 ? 1 : data[data.length - 1].id + 1;
  newTicket = { ...newTicket, id: id, status: "pending" };
  data.push(newTicket);
  writeFile(data);
  res
    .status(200)
    .json({
      message: "Successfully creates a ticket with default status pending.",
    });
};

let getTicketsById = (req, res) => {
  let id = req.params.id;
  let data = readData();
  if (data.length == 0) {
    return res.status(404).json({ message: "No tickets Available.." });
  }
  let index = findIndex(-1, data, id);
  res.status(200).json(data[index]);
};

let updateTicketByID = (req, res) => {
  let id = req.params.id;
  let updatedTicket = req.body;
  let data = readData();
  if (data.length == 0) {
    return res
      .status(404)
      .json({ message: "No tickets Available to Update.." });
  }
  let index = findIndex(-1, data, id);
  if (index == -1) {
    return res
      .status(404)
      .json({ message: "Ticket is not present to update with that id." });
  }
  updatedTicket = { ...updatedTicket, id: id };
  data[index] = updatedTicket;
  writeFile(data);
  res.status(200).json({ message: "Ticket Updated.." });
};

let deleteTicketByID = (req, res) => {
  let id = req.params.id;
  let data = readData();
  if (data.length == 0) {
    return res.status(404).json({ message: "No tickets Available to Delete" });
  }
  let index = findIndex(-1, data, id);
  if (index == -1) {
    return res
      .status(404)
      .json({ message: "Ticket is not present to delete with that id." });
  }
  dataAfterDeletion = data.filter((ticket) => ticket.id != id);
  writeFile(dataAfterDeletion);
  res.status(200).json({ message: "Ticket Deleted" });
};

let resolveTicketByID = (req, res) => {
  let id = req.params.id;
  console.log(id);
  let data = readData();
  if (data.length == 0) {
    return res.status(404).json({ message: "No Tickets to Resolve." });
  }
  let index = findIndex(-1, data, id);
  if (index == -1) {
    return res
      .status(404)
      .json({ message: "No Ticket to Resolve with that id." });
  }
  data[index] = { ...data[index], status: "resolved" };
  writeFile(data);
  res.status(200).json({ message: "Ticket Resolved.." });
};

module.exports = {
  addNewTicket,
  getAllTickets,
  getTicketsById,
  updateTicketByID,
  deleteTicketByID,
  resolveTicketByID,
};
