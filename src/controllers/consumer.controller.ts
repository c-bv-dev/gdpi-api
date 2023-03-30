import consumerService from '@/services/consumer.service';
import pick from '@utils/pick';
import { Request, Response } from 'express';

const createConsumer = async (req: Request, res: Response) => {
    const consumer = await consumerService.createConsumer(req.body);
    res.status(201).send(consumer);
};

const getConsumers = async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name', 'email']);
    const Consumers = await consumerService.getConsumers(filter);
    res.send(Consumers);
};

const getConsumer = async (req: Request, res: Response) => {
    const consumer = await consumerService.getConsumer(req.params.id);
    res.send(consumer);
};

const updateConsumer = async (req: Request, res: Response) => {
    const consumer = await consumerService.updateConsumer(req.params.id, req.body);
    res.send(consumer);
};

const deleteConsumer = async (req: Request, res: Response) => {
    await consumerService.deleteConsumer(req.params.id);
    res.status(204).send();
};

export default {
    getConsumers,
    getConsumer,
    createConsumer,
    updateConsumer,
    deleteConsumer
};