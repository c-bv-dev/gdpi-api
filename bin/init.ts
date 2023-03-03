import User from '@/models/user.model';
import { createInterface } from 'readline';

const questions = [
    {
        name: 'first_name',
        message: 'Enter first name: '
    },
    {
        name: 'last_name',
        message: 'Enter last name: '
    },
    {
        name: 'email',
        message: 'Enter email: '
    },
    {
        name: 'password',
        message: 'Enter password: '
    },
    {
        name: 'role',
        message: 'Enter role: ',
        allowed: ['user', 'admin']
    }

];

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question: string, allowed: string[] = []) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            if (allowed.length && !allowed.includes(answer)) {
                reject(`Answer must be one of: ${allowed.join(', ')}`);
            }
            resolve(answer);
        });
    });
};

const createUser = async () => {
    console.clear();
    const answers = {} as any;
    for (const question of questions) {
        try {
            const answer = await ask(question.message, question.allowed);
            answers[question.name] = answer;
        } catch (error) {
            console.log(error);
            rl.close();
            return;
        }
    };
    
    const user = await User.create({
        firstName: answers.first_name,
        lastName: answers.last_name,
        email: answers.email,
        password: answers.password,
        role: answers.role
    });
    console.log('🚩', 'User created successfully', user);
    rl.close();
};

createUser();