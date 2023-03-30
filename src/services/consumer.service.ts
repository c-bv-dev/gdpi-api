import db from '@/models';
import Consumer from '@/models/consumer.model';
import ApiError from '@/utils/ApiError';
import httpStatus from 'http-status';

const getConsumers = async (filter: any) => {
    return await Consumer.findAll(filter);
};

const getConsumer = async (id: string) => {
    return await Consumer.findByPk(id);
};

const createConsumer = async (consumerBody: any) => {
    return await Consumer.create(consumerBody);
};

const updateConsumer = async (id: string, updateBody: any) => {
    const consumer = await getConsumer(id);
    if (!consumer) throw new ApiError(httpStatus.NOT_FOUND, 'Consumer not found');
    Object.assign(consumer, updateBody);
    await consumer.save();
    return consumer;
};

const deleteConsumer = async (id: string) => {
    const consumer = await getConsumer(id);
    if (!consumer) throw new ApiError(httpStatus.NOT_FOUND, 'Consumer not found');
    return await consumer.destroy();
};

export default {
    getConsumers,
    getConsumer,
    createConsumer,
    updateConsumer,
    deleteConsumer
};