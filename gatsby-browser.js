import React from 'react';
import Firebase, { FirebaseContext } from './src/components/Firebase';

export const wrapRootElement = ({ element }) => (
  <FirebaseContext.Provider value={new Firebase()}>{element}</FirebaseContext.Provider>
)
