import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const generatePatient = (number) => {
  const persons = [];
  const max = Math.floor(Math.random() * 8);
  const statuses = ['Idle', 'Waiting', 'Processing'];
  while (number >= 0) {
    persons.push({
      id: uuidv4(),
      name: faker.name.firstName(),
      joining_date: faker.date.future(),
      status: statuses[Math.floor(statuses.length * Math.random())],
      exercises: {
        completed: Math.floor(Math.random() * max),
        total: max
      }
    });
    number--;
  }
  return persons;
};
const generateExercise = (number) => {
  const persons = [];
  const max = Math.floor(Math.random() * 8);
  const statuses = ['Submitted', 'Completed', 'Processing'];
  while (number >= 0) {
    persons.push({
      id: uuidv4(),
      status: statuses[Math.floor(statuses.length * Math.random())],
      surveys: {
        total: 2,
        completed: 2,
        data: [
          {
            id: uuidv4(),
            label: 'Prova',
            status: 'Completed',
            submitted: faker.date.past(),
            finished: faker.date.past(),
          },
          {
            id: uuidv4(),
            label: 'Prova',
            status: 'Completed',
            submitted: faker.date.past(),
            finished: faker.date.past(),
          },
        ]
      }
    });
    number--;
  }
  return persons;
};

console.log(JSON.stringify(generateExercise(4)))