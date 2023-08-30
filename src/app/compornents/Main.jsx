"use client"
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

function Main() {

  //ロード時の表示
  const [data, setData] = useState([]);
  async function fetchloard(){
    const response = await fetch('http://localhost:3000/api/be');
    if(!response.ok){
      console.log("ロード中にエラーが発生しました");
    }
    const data = await response.json();
    setData(data.posts);
  }
  useEffect(() => {
    fetchloard();
  }, []);

  //入力された文字を取得
  const [value, setValue] = useState('');
  function enterValue(e){
    setValue(e.target.value);
  }

  //POST処理
  async function fetchData(e){
    e.preventDefault();
    toast.loading("作成中...",{id:"1"});
    const postData = {
      message: value
    }
    await fetch('http://localhost:3000/api/be',{
      method:'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify(postData),
    });
    setValue('');
    fetchloard();
    toast.success("作成しました",{id:"1"});
  }

  //Delete処理
  async function fetchDelete(e){
    e.preventDefault();
    toast.loading("削除中...",{id:"1"});
    const no = e.target.value;
    await fetch('http://localhost:3000/api/be',{
      method:'DELETE',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify(no),
    })
    fetchloard();
    toast.success("削除しました", { id: "1" });
  }
  return (
    <>
    <Toaster />
    <div className={'mb-6'}>
        <input type="text" value={value} onChange={enterValue} className={'px-2 mx-3 border border-gray-100 rounded'} placeholder='文字を入力してください'/>
        <button onClick={(e) => fetchData(e)} className={'border border-gray-600 rounded px-3'}>送信</button>
    </div>
    <div className={'flex justify-center'}>
        <ul className={'flex items-center flex-col w-1/2 text-left pb-3'}>
        {data.slice().reverse().map((item) => (
            <li key={item.id} className={'bg-blue-50 w-10/12 px-3 mt-3'}>
              <p className={'text-xs'}>{item.date}</p>
              <div className={'flex justify-between'}>
                <p className={'font-bold'}>{item.message}</p>
                <button className={'border border-gray-600 rounded px-3 mb-2 bg-white'}　value={item.id} onClick={(e) => fetchDelete(e)}>削除</button>
              </div>
            </li> 
          ))}
        </ul>
    </div>
    </>
  )
}

export default Main