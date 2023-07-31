import axios, { AxiosResponse } from 'axios';

let accessToken: string;

async function getCookieValue(page: any, cookieName: string): Promise<string | null> {
  const cookie = await page.evaluate((name: string) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }, cookieName);
  return cookie;
}

async function validateViewData(): Promise<AxiosResponse<any>> {
  const data = JSON.stringify({
    id: 3
  });

  const headers = {
    'content-type': 'application/json',
  };

  const requestUrl = 'https://api.demoblaze.com/view';

  try {
    const response = await axios.post(requestUrl, data, { headers });
    // Additional assertions as needed
    console.log(JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function validateCartData(accessToken: string): Promise<AxiosResponse<any>> {
  const data = JSON.stringify({
    cookie: accessToken,
    flag: true,
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/viewcart',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function loginAPI(username: string, password: string): Promise<string> {
  const encodedPass = Buffer.from(password).toString('base64');

  const data = JSON.stringify({
    username: username,
    password: encodedPass,
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/login',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    accessToken = response.data.split(':')[1].trim();
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addToCart(accessToken: string): Promise<void> {
  const data = JSON.stringify({
    id: '10269695-5414-caf2-375c-1e4393d91a3c',
    cookie: accessToken,
    prod_id: 3,
    flag: true
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/addtocart',
    headers: {
      'content-type': 'application/json',
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  validateCartData,
  validateViewData,
  loginAPI,
  addToCart
};
