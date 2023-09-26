import axios from 'axios';
import { ResponseBack } from '../domain/ResponseBack';

export const getBack = async (
  url: string,
): Promise<ResponseBack> => {

  const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const responseFailed: ResponseBack = {
      team: "ERROR",
      uptime: "false",
      versions: [
        {
          name: "Track ID - 1",
          tag: "0123456789",
          success: false
        }
      ]
  };

  // Execute Get
  try {
    let response: any;
    response = await instance.get("");  
    console.log(response.status)
    console.log(url)
    if (response.data != null) {
      return response.data
    } 
    return response.data;
  } catch (error) {
    console.log(error);
    return responseFailed;
  }
};