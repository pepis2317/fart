import Image from "next/image"
import './usersettings.css'
import { useEffect, useReducer, useState } from "react"
import { v4 } from "uuid"
import getImageDownloadURL from "@/app/api/getImageDownloadURL"
export default function UserSettings({ UserEmail }: any) {
    const [user, setUser] = useState<any>(null)
    const [Username, setUsername] = useState("")
    const [Comms, setComms] = useState(false)
    const [BannerFile, setBannerFile] = useState<any | null>(null)
    const [PfpFile, setPfpFile] = useState<any | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/getUser/${UserEmail}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setComms(userData.Commissioning)
                setUsername(userData.Username)
                setUser(userData);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, []);
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
        let bannerName = user.UserBanner
        let pfpName = user.UserPfp
        if (BannerFile && BannerFile.name) {
            bannerName = v4() + BannerFile.name
            await uploadImage(BannerFile, bannerName, 'banners/')
        }
        if(PfpFile && PfpFile.name){
            pfpName = v4() + PfpFile.name
            await uploadImage(PfpFile, pfpName, 'profilePictures/')
        }  
        try {
            const response = await fetch(`/api/editProfile/${user.UserID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserPfp: 'profilePictures/' + pfpName,
                    UserBanner: 'banners/' + bannerName,
                    Username: Username,
                    Commissioning: Comms,
                }),
            });

            const data = await response.json();
            if (!data.ok) {
                console.log("fuck smth went wrong")
            }
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
                        {user.UserPfp == '' ? <></> : <Image loader={() => user.UserPfp} src={user.UserPfp} alt={""} layout='fill' objectFit="cover" />}
                    </div>
                    <div className="banner">
                        {user.UserBanner == '' ? <></> : <Image loader={() => user.UserBanner} src={user.UserBanner} alt={""} layout='fill' objectFit="cover" />}
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
                    <button onClick={() => handleSaveChanges()}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}