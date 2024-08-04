import React, { useState } from 'react'

import { HfInference } from "@huggingface/inference";
const App = () => {
  const hf = new HfInference(import.meta.env.VITE_AUTH_TOKEN);
  let [inputdata, setInputData] = useState("");
  let [imgData, setImgData] = useState("");
  let [loading, setLoading] = useState(false);
  let submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (inputdata === "") {
        return setErrormsg("Enter an valid input !!!");
      }
      let response = await hf.textToImage({
        inputs: inputdata,
        model: import.meta.env.VITE_API_URL
      })
      let img = URL.createObjectURL(response);
      setImgData(img);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  let downloadHandler = async () => {
    let element = document.createElement("a");
    element.href = imgData;
    element.download = inputdata + ".jpg";
    document.body.appendChild(element);
    element.click();
  }




  return (

    <>

      <div className='h-[100vh] flex justify-center items-center bg-final text-primary'>
        <div className='bg-tertiary lg:mt-0 mt-8 p-5 h-[530px] rounded-md shadow-md'>

          <form onSubmit={submitHandler}>
            <input type="text" className='  w-full text-center text-2xl rounded-md bg-secondary' onChange={e => setInputData(e.target.value)} placeholder='Enter prompt here ...' /> <br />
            {inputdata === "" ?
              <>
                <button disabled className='p-2 cursor-not-allowed bg-secondary my-2 rounded-md w-full' type='submit'>Generate Image</button>
              </>
              :
              <>
                {loading ?
                  <button disabled className='p-2 cursor-not-allowed bg-secondary my-2 rounded-md w-full' type='submit'>Generate Image</button>
                  :
                  <button className='p-2 bg-secondary my-2 rounded-md w-full hover:bg-white hover:text-secondary' type='submit'>Generate Image</button>
                }
              </>
            }


          </form>
          {loading ?
            <>
              <div
                class="p-3 lg:m-14 m-36 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
              >
                <div
                  class="rounded-full h-full w-full bg-tertiary background-blur-md"
                ></div>
              </div>

            </>
            :
            <>
              {imgData === "" ?
                <>
                  <div className='text-center p-5 text-2xl font-bold mt-36'>Image will be placed here !!!</div>
                </>
                :
                <>
                  <img src={imgData} alt="imagelink" width={350} className='rounded-md shadow-md' />



                  <button onClick={downloadHandler} className='p-2 bg-secondary my-2 rounded-md w-full hover:bg-white hover:text-secondary'>Download</button>
                </>
              }


            </>

          }
        </div>
      </div>
    </>

  )
}

export default App
