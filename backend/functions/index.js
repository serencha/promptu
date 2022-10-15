const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

exports.getUsers = functions.https.onRequest(async (request, response) => {
	const users = await db.collection('users').get();
	// todo -> format properly
	response.send(users.docs.map((doc) => doc.data()));
});
