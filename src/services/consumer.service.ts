import db from '@/models';
import Consumer from '@/models/consumer.model';

const getConsumers = async (filter: any) => {
    return await Consumer.findByPk(1, {
        include: [db.Assets],
    });
};


export default {
    getConsumers,
};