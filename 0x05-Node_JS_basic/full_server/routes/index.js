import express from 'express';
import { AppController } from '../controllers/AppController';
import { StudentsController } from '../controllers/StudentsController';
export const router = express.Router();

// Define routes
router.get('/', AppController.getHomePage);
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);
