import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

// Firebase Cloud Functions Configuration
var serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://angular-udemy-cloud-functions.firebaseio.com'
});

const db = admin.firestore();

// Express Configuration
const app = express();
app.use(cors({ origin: true }));

// GET REQUEST
app.get('/getCollection', async (req, res) => {
  const collectionRef = db.collection('games');
  const snapshot = await collectionRef.get();
  const itemsInCollection = snapshot.docs.map(item => item.data());
  res.json(itemsInCollection);
});

// POST REQUEST
app.post('/postItem/:itemID', async (req, res) => {
  const itemID = req.params.itemID; // Retreives content in param [itemID]
  const collection = 'games';
  const itemRef = db.collection(collection).doc(itemID);
  const snapshot = await itemRef.get();

  if (!snapshot.exists) {
    res.status(404).json({
      ok: false,
      error: `Item with ID (${itemID}) wasn't found in (${collection}) collection`
    });
  } else {
    const item = snapshot.data() || {};
    await itemRef.update({
      votes: item.votes + 1
    });

    res.json({
      ok: true,
      msg: `Item (${itemID}) was updated successfully`
    });
  }
});

// Export REST server
export const api = functions.https.onRequest(app);
