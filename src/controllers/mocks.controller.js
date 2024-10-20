import MockingService from "../services/mocking.js";
import { usersService, petsService } from "../services/index.js";

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({ status: "success", payload: pets });
};

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50);
    res.send({ status: "success", payload: users });
};

const generateData = async (req, res) => {
    const { users, pets } = req.body;

    try {
        if (users) {
            const usersToCreate = await MockingService.generateMockingUsers(users);
            await usersService.create(usersToCreate);
        }

        if (pets) {
            const petsToCreate = await MockingService.generateMockingPets(pets);
            await petsService.create(petsToCreate);
        }

        res.status(201).send({ status: "success", message: "Data generated successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error generating data" });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
