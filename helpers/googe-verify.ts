import { OAuth2Client } from 'google-auth-library';

interface GoogleClient{
    name: String;
    email: String;
    img: String;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken: string):Promise<GoogleClient> => {
    
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    }).catch((error)=> {return error});

  const {
    name,
    email,
     img
 }    = ticket.getPayload()?.name
    
    return {name, email, img};
}

export default googleVerify
