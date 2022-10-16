const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

exports.getUsers = functions.https.onRequest(async (request, response) => {
	const users = await db.collection('users').get();
	response.send(users.docs.map((doc) => doc.data()));
});

exports.updateLikes = functions.https.onRequest(async (request, response) => {
	const id = request.query.postId;
	await db
		.collection('posts')
		.doc(id)
		.update({ likes: FieldValue.increment(1) });

	const newPost = await db.collection('posts').doc(id).get();
	response.send({ likes: newPost.data().likes }); // lmao unoptimal but works for now
});

// todo -> format properly
exports.getPrompts = functions.https.onRequest(async (request, response) => {
	const today = new Date(); // wrong format, figure out then we chilling
	console.log(today);
	const prompts = await db
		.collection('prompts', (ref) => ref)
		.where('end_time', '>=', today) // bruh why dont let u do two where statements
		.get();

	response.send(
		prompts.docs
			.map((doc) => doc.data())
			.filter((d) => {
				return d.start_time.toMillis() <= today.getTime();
			})
	);
});

exports.getPosts = functions.https.onRequest(async (request, response) => {
	const posts = await db.collection('posts').get();
	response.send(posts.docs.map((doc) => doc.data()));
});

// exports.getLikes =
// exports.getComments =
// exports.getAudio =
