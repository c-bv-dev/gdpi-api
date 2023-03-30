import { consumerController } from '@controllers';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = asyncRouter(express.Router());

router.route('/')
    .get(consumerController.getConsumers)
    .post(consumerController.createConsumer)

router.route('/:id')
    .get(consumerController.getConsumer)
    .put(consumerController.updateConsumer)
    .delete(consumerController.deleteConsumer)

export default router;