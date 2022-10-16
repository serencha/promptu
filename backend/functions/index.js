const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;
const cors = require('cors')({ origin: '*' });

exports.getUsers = functions.https.onRequest(async (request, response) => {
	cors(request, response, async () => {
		const users = await db.collection('users').get();
		response.send(
			users.docs.map((doc) => {
				return { data: doc.data(), id: doc.id };
			})
		);
	});
});

exports.updateLikes = functions.https.onRequest(async (request, response) => {
	cors(request, response, async () => {
		const id = request.query.postId;
		await db
			.collection('posts')
			.doc(id)
			.update({ likes: FieldValue.increment(1) });

		const newPost = await db.collection('posts').doc(id).get();
		response.send({ likes: newPost.data().likes, id: newPost.id }); // lmao unoptimal but works for now
	});
});

exports.getPrompts = functions.https.onRequest(async (req, res) => {
	cors(req, res, async () => {
		const today = new Date(); // wrong format, figure out then we chilling
		const prompts = await db
			.collection('prompts', (ref) => ref)
			.where('end_time', '>=', today) // bruh why dont let u do two where statements
			.get();
		res.send(
			prompts.docs
				.map((doc) => [doc.data(), doc.id])
				.filter((d) => {
					return d[0].start_time.toMillis() <= today.getTime();
				})
				.map((d2) => {
					return {
						description: d2[0].description,
						id: d2[1],
					};
				})
		);
	});
});

exports.getAllPrompts = functions.https.onRequest(async (req, res) => {
	cors(req, res, async () => {
		const prompts = await db.collection('prompts', (ref) => ref).get();
		res.send(
			prompts.docs.map((doc) => {
				return { data: doc.data(), id: doc.id };
			})
		);
	});
});

exports.getPosts = functions.https.onRequest(async (request, response) => {
	cors(request, response, async () => {
		const posts = await db.collection('posts').get();
		response.send(
			posts.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			})
		);
	});
});

// exports.getLikes =
// exports.getComments =
// exports.getAudio =
