import ticketService from '@/services/ticket.service';
import pick from '@utils/pick';
import { Request, Response } from 'express';

const getTickets = async (req: Request, res: Response) => {
    const filter = pick(req.query, ['firstName', 'lastName', 'email']);
    const tickets = await ticketService.getTickets(filter);
    res.send(tickets);
};

const getTicket = async (req: Request, res: Response) => {
    const ticket = await ticketService.getTicket(req.params.id);
    res.send(ticket);
};

const createTicket = async (req: Request, res: Response) => {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).send(ticket);
};

const updateTicket = async (req: Request, res: Response) => {
    const ticket = await ticketService.updateTicket(req.params.id, req.body);
    res.send(ticket);
};

const deleteTicket = async (req: Request, res: Response) => {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send();
};

export default {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
};