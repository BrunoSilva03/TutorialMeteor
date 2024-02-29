import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) => 
TasksCollection.insert({ 
  text: taskText ,
  userId: user._id,
  createdAt: new Date(),
});

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);


 if(TasksCollection.find().count() === 0) {
  [
    'First Task',
    'Second Task',
    'Third Task',
    'Fourth Task',
    'Fifth Task',
    'Sixth Task',
    'Seventh Task',
  ].forEach(taskText => insertTask(taskText, user));
 }

 ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'ae02062a36d85d23d76b', 
      secret: 'a9c3824a6d534bdecc923f311cf1f35aa776ce2d',
    },
  }
 )
});
