import { NotFoundError } from '../apiErrors/apiErrors';
import User, { IUser } from '../models/User';

import { generateToken } from '../utils/crypto';
import { secretAuth } from '../utils/secrets';

//create
const signUp = async (newUser: IUser) => {
  console.log('newUser before services: ', newUser);
  const saveUser = await newUser.save();
  console.log('saveUser after services: ', saveUser);

  return saveUser;
};

const confirmEmail = async (user: IUser) => {
  const userId = user._id;
  const confirmUser = await User.findByIdAndUpdate(userId, user, { new: true });
  if (!confirmUser) throw new NotFoundError('Can not update user information');
  return confirmUser;
};

const signIn = async (user: IUser) => {
  const token = generateToken(user.email, secretAuth);

  const email = user.email;
  const name = user.name;
  const role= user.role;
  return { token, email, name, role };
};

export default {
  signUp,
  confirmEmail,
  signIn,
};
