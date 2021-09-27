import { TIMEOUT_SEC } from "./config";

const timeout = (sec) => 
{
    return new Promise((_, reject) =>
    {
      setTimeout(()=>
      {
        reject(new Error(`Request took too long! Timeout after ${sec} second`));
      }, sec * 1000);
    });
};

export const getJSON = async (url) =>
{
    try
    {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error (`${data.message} (${res.status})`); 
        // console.log(data);
        return data;
    }
    catch(error)
    {
        // if we loged the error here...it will be printed in the console...but i want to print the error in the function which is using this function(model.js)
        throw err;
    }
}

export const sendJSON = async (url, uploadData) =>
{
    try
    {
      const fetchPro = fetch(url,
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
      });
      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      if(!res.ok) throw new Error (`${data.message} (${res.status})`); 
      // console.log(data);
      return data;
    }
    catch(error)
    {
        // if we loged the error here...it will be printed in the console...but i want to print the error in the function which is using this function(model.js)
        throw err;
    }

}
  
  