import Ticket from '@/models/ticket.model';
import ApiError from '@/utils/ApiError';
import httpStatus from 'http-status';

const getTickets = async (filter: any) => {
    return await Ticket.findAll(filter);
};

const getTicket = async (id: string) => {
    return await Ticket.findByPk(id);
};

const createTicket = async (ticketBody: any) => {
    return await Ticket.create(ticketBody);
};

const updateTicket = async (id: string, updateBody: any) => {
    const ticket = await getTicket(id);
    if (!ticket) throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    Object.assign(ticket, updateBody);
    await ticket.save();
    return ticket;
};

const deleteTicket = async (id: string) => {
    const ticket = await getTicket(id);
    if (!ticket) throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
    return await ticket.destroy();
};

export default {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
};