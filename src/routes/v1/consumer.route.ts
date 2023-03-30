import { consumerController } from '@controllers';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = asyncRouter(express.Router());

router.route('/')
    .get(consumerController.getConsumers)
    

export default router;