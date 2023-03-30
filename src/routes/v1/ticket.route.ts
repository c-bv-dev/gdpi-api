import { ticketController } from '@controllers';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = asyncRouter(express.Router());

router.route('/')
    .get(ticketController.getTickets)
    .post(ticketController.createTicket)

router.route('/:id')
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket)

export default router;