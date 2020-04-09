const natural = require('natural');

const classifier = new natural.BayesClassifier();

classifier.addDocument('i need help with groceries', 'Groceries');
classifier.addDocument('can someone fetch my groceries', 'Groceries');
classifier.addDocument('i need food', 'Groceries');
classifier.addDocument('i am running out of food', 'Groceries');
classifier.addDocument('food bag', 'Groceries');

classifier.train();

classifier.save(`tools/classifier.json`, function (err, classifier) {
  console.log('Trained and saved');
});
