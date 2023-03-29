import { companyController } from '@controllers';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = asyncRouter(express.Router());

router.route('/')
    .get(companyController.getCompanies)
    

export default router;