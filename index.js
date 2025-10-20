const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const sgMail = require('@sendgrid/mail');
const stripe = require('stripe')(process.env.STRIPE_SECRET || functions.config().stripe ? functions.config().stripe.secret : '');
admin.initializeApp();

const db = admin.firestore();

// Configure SendGrid key via: firebase functions:config:set sendgrid.key="YOUR_KEY"
if (functions.config().sendgrid && functions.config().sendgrid.key) {
  sgMail.setApiKey(functions.config().sendgrid.key);
}

exports.createOrder = functions.https.onCall(async (data, context) => {
  // Authentication required
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Request had no authentication.');
  }
  const uid = context.auth.uid;
  const items = data.items || [];
  const total = data.total || 0;

  // Basic validation
  if (!Array.isArray(items) || items.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Cart is empty.');
  }
  // Create order document server-side
  const orderRef = await db.collection('orders').add({
    customerId: uid,
    items,
    total,
    status: 'placed',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // Send email to admin or user if SendGrid configured
  try {
    if (sgMail && functions.config().sendgrid && functions.config().sendgrid.key) {
      const msg = {
        to: 'orders@example.com', // change to admin email or user email
        from: 'no-reply@example.com',
        subject: 'New order received',
        text: `New order ${orderRef.id} placed. Total: ${total}`,
      };
      await sgMail.send(msg);
    }
  } catch (e) {
    console.error('SendGrid send failed', e);
  }

  return { id: orderRef.id };
});
