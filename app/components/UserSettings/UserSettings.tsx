import Image from "next/image"
import './usersettings.css'
import { useEffect, useReducer, useState } from "react"
import { v4 } from "uuid"
import getImageDownloadURL from "@/app/api/getImageDownloadURL"
import { useRouter } from "next/navigation"
export default function UserSettings({ UserEmail }: any) {
    const [user, setUser] = useState<any>(null)
    const [Username, setUsername] = useState("")
    const [Comms, setComms] = useState(false)
    const [BannerFile, setBannerFile] = useState<any | null>(null)
    const [PfpFile, setPfpFile] = useState<any | null>(null)
    const [BannerURL, setBannerURL] = useState("")
    const [PfpURL, setPfpURL] = useState("")
    const [BannerPath, setBannerPath] = useState("")
    const [PfpPath, setPfpPath] = useState("")
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/getUser/${UserEmail}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                console.log(UserEmail)
                setComms(userData.Commissioning)
                setUsername(userData.Username)
                setPfpURL(await getImageDownloadURL(userData.UserPfp))
                setBannerURL(await getImageDownloadURL(userData.UserBanner))
                setBannerPath(userData.UserBanner)
                setPfpPath(userData.UserPfp)
                setUser(userData);

            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, [UserEmail]);
    const uploadImage = async (file: any | null, name: any, folder: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            try {
                const imageRes = await fetch('/api/postImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageUpload: {
                            folder: folder,
                            name: name,
                            data: reader.result.split(',')[1]
                        }
                    })
                })
                if (!imageRes.ok) {
                    throw new Error('Failed to upload image');
                }
                const imageRespone = await imageRes.json()
                console.log('Image uploaded', imageRespone)
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }
    const handleSaveChanges = async () => {
        var bannerName = BannerPath
        let pfpName = PfpPath
        if (BannerFile && BannerFile.name) {
            bannerName = v4() + BannerFile.name
            await uploadImage(BannerFile, bannerName, 'banners/')
            bannerName = 'banners/' + bannerName

        }
        if (PfpFile && PfpFile.name) {
            pfpName = v4() + PfpFile.name
            await uploadImage(PfpFile, pfpName, 'profilePictures/')
            pfpName = 'profilePictures/' + pfpName
        }
        try {
            const response = await fetch(`/api/editProfile/${user.UserID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserPfp: pfpName,
                    UserBanner: bannerName,
                    Username: Username,
                    Commissioning: Comms,
                }),
            });

            await response.json();
            location.reload()
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    }
    if (!user) {
        return
    }
    return (
        <div className="settingswrapper">

            <div className="settingscontainer">
                <div className="leftsettings">
                    <div className="pfp">
                        {PfpURL == '' ? <></> : <Image loader={() => PfpURL} src={PfpURL} alt={""} layout='fill' objectFit="cover" />}
                    </div>
                    <div className="banner">
                        {BannerURL == '' ? <></> : <Image loader={() => BannerURL} src={BannerURL} alt={""} layout='fill' objectFit="cover" />}
                    </div>
                </div>
                <div className="rightsettings">
                    <div className="textinput">
                        <label>Username</label>
                        <input type="text" placeholder={user.Username} value={Username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="fileinput">
                        <label>Banner</label>
                        <input type="file" onChange={(e) => setBannerFile(e.target.files[0])} />
                    </div>
                    <div className="fileinput">
                        <label>Profile Picture</label>
                        <input type="file" onChange={(e) => setPfpFile(e.target.files[0])} />
                    </div>
                    <div className="checkboxinput">
                        <label>Commissioning</label>
                        <input type="checkbox" checked={Comms} onChange={(e) => setComms(e.target.checked)} />
                    </div>
                    <button className="updatebutton"onClick={() => handleSaveChanges()}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

function StorageReference(UserBanner: any) {
    throw new Error("Function not implemented.")
}
