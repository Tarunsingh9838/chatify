import React, { use } from "react";
import Message from "./Message";
import useGetMessages from "../../context/userGetMessage";
import Loading from "../../components/Loading";
import { useRef,useEffect } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage";


const Messages = () => {
  const { loading, messages } = useGetMessages();
  useGetSocketMessage();
  console.log(messages);
  const lastMsgref=useRef()
  useEffect(()=>{
    setTimeout(()=>{
      if(lastMsgref.current){
        lastMsgref.current.scrollIntoView({behavior:"smooth"});
      }
    },100) 
  },[messages])

  return (
    <div className="px-4 py-3 space-y-3">
      {loading ? (<Loading />) : (
        messages.length > 0 && 
        messages.map((message) => (
        <div  key={message._id} ref={lastMsgref} >
          <Message message={message} />
        </div>
      )))}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%] text-gray-400">No messages yet. Start the conversation!</p>
        </div>
      )}

    </div>
  );
};

export default Messages;
