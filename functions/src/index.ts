const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// increaseTotal({
//   amount: 2, 
//   price: 1.5
// }, {
//   params: {
//     orderId: "oYTvfobqOZhVwiZCq7AO"
//   }
// });

exports.increaseTotal = functions.firestore
  .document('orders/{orderId}/products/{productId}')
  .onCreate(async (doc: any, event: any) => {

    const orderId = event.params.orderId;
    // const productId = event.params.productId;

    // ref to the parent document
    const orderRef = admin.firestore().collection('orders').doc(orderId);
    const { price, amount } = doc.data();
    const total = price * amount;
    try {
      console.log('adding ', total);
      await orderRef.update({
        total: admin.firestore.FieldValue.increment(total)
      });
      console.log('success');
    } catch (e) {
      console.log(e);
    }

  });