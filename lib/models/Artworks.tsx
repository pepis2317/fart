import { Timestamp } from "firebase/firestore"

export type ArtworkType={
    ArtworkID:string,
    ArtworkDate: Timestamp,
    ArtworkDescription: string,
    ArtworkImage: string,
    ArtworkTitle:string,
    UserID:string
}