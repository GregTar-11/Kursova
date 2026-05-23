import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/services/firebase/firebase.config';
import { IUser } from '@/types/schema/schema.type';
import { getErrorCode } from '@/helpers/getErrorCode';
import { COLLECTIONS } from '@/constant/collection';
import { ERRORS_KEYS } from '@/helpers/createNamespace';
import { AppError } from '@/helpers/AppError';

export  type IRegisterData = Omit<IUser,'uid'> &{
  password: string;
}

interface ILoginData {
  email: string;
  password: string;
}
export const handleError = (err: unknown): Promise<never> => {
  const key = getErrorCode(err);
  const isKnownError = key in ERRORS_KEYS;
  const translationKey = isKnownError
    ? ERRORS_KEYS[key as keyof typeof ERRORS_KEYS]
    : ERRORS_KEYS['unknown'];
  throw new AppError(translationKey);
};

export class AuthService {
  static async register(data: IRegisterData): Promise<IUser> {
    const fullNames = `${data.firstName} ${data.lastName}`;
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async ({ user: authUser }) => {
        const userProfile: IUser = {
          uid: authUser.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: fullNames,
          email: data.email,
          phone: data.phone || null,
          avatar: data.avatar || '',
          createdAt: data.createdAt,
        };
        await setDoc(doc(db, COLLECTIONS.USERS, authUser.uid), userProfile);
        return userProfile;
      })
      .catch(handleError);
  }

  static async login(data: ILoginData): Promise<IUser> {
    return signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user: authUser }) =>
        getDoc(doc(db, COLLECTIONS.USERS, authUser.uid)),
      )
      .then((userSnapshot) => {
        if (!userSnapshot.exists()) {
          throw new AppError('errors.invalid_credential');
        }
        return userSnapshot.data() as IUser;
      })
      .catch(handleError);
  }

  static async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  static async handleGoogleRedirectResult(): Promise<IUser | null> {
    const result = await getRedirectResult(auth);

    if (!result) return null;

    const { user: authUser } = result;

    const userRef = doc(db, COLLECTIONS.USERS, authUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const [firstName, ...lastName] = (authUser.displayName || 'User').split(
        ' ',
      );
      const emails = authUser.email?.toLowerCase();

      const newUser: IUser = {
        uid: authUser.uid,
        firstName,
        lastName: lastName.join(' '),
        fullName: authUser.displayName!,
        email: emails!,
        phone: null,
        avatar: authUser.photoURL || '',
        createdAt:'',
      };

      await setDoc(userRef, newUser);
      return newUser;
    }
    return userSnap.data() as IUser;
  }

  static async getUser(uid: string): Promise<IUser | null> {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    return getDoc(userRef)
      .then((userSnap) => {
        if (!userSnap.exists()) throw new AppError('errors.user_not_found');
        return userSnap.data() as IUser;
      })
      .catch(handleError);
  }
}
