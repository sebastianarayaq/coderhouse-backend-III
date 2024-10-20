import {faker} from "@faker-js/faker"; 
import { createHash } from "../utils/index.js";

class MockingService {
    static async generateMockingUsers(num) {
        const users = [];
        const hashedPassword = await createHash('coder123');

        for (let i = 0; i < num; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            });
        }

        return users;
    }

    static async generateMockingPets(num){
        const pets = []; 

        for (let i = 0; i < num; i++) {
            pets.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false
            })
        }
        console.log(pets);
        return pets; 
    }
}

export default MockingService; 