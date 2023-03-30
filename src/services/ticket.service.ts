import db from '@/models';
import Consumer from '@/models/consumer.model';

const getCompanies = async (filter: any) => {
    return await Consumer.findByPk(1, {
        include: [db.Assets],
    });
};


export default {
    getCompanies,
};