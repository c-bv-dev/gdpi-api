import db from '@/models';
import Company from '@/models/company.model';

const getCompanies = async (filter: any) => {
    return await Company.findByPk(1, {
        include: [db.Assets],
    });
};


export default {
    getCompanies,
};