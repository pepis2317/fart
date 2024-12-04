
import { db, storage } from "@/lib/firebase/firebaseConfig"
import { addDoc, collection } from "firebase/firestore";
import { ref } from "firebase/storage"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
      const { username, email, password } = await request.json();
  
      if (!username || !email || !password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const registeredUser = {
        Username: username,
        UserEmail: email,
        UserPfp: 'profilePictures/default.jpg',
        UserBanner: 'banners/blank.jpg',
        Commissioning: false,
      };
  
      const docRef = await addDoc(collection(db, 'users'), registeredUser);
  
      return NextResponse.json({ message: 'User registered successfully', userId: docRef.id }, { status: 201 });
    } catch (error) {
      console.error('Error registering user: ', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }