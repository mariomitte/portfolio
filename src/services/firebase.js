import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

let firebaseInstance

class Firebase {
  constructor() {
    if (!app.length) {
      try {
        app.initializeApp(config)
      } catch (err) {
          console.error(`Firebase initialization error raised`, err.stack)
      }
    }

    // this.auth = app.auth();
    this.db = app.database();
  }

  writeStar = () => {
    this.db.ref('stars/').set(this.state);
    console.log('DATA SAVED');
  }

  getStar = () => {
    let ref = this.db.ref('stars/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      // this.setState(state);
      console.log(state)
    });
    console.log('DATA RETRIEVED');
  }

  // *** Stars API ***
  star = uid => this.db.ref(`stars/${uid}`);
  stars = () => this.db.ref('stars');
}

export default Firebase;
