import React,{useState} from "react";
import Rdetails from "./RoomInformation.json";
export const ChooseRoom = () => {
    const[roomData,setRoomData]=useState(Rdetails);
    // console.log(roomData);
  return (
      <>
      <div className="row">
      {roomData.map((r,i)=>{
          return(
        <div className="col-sm col-lg" key={i}>
      <div className="card " style={{"width": "18rem"}}>
        <img className="card-img-top img-fluid" src={r.img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{r.cost}</h5>
          <h5 className="card-title">{r.bed}</h5>
          <h5 className="card-title">{r.area}</h5>
          <a href="/rooms" className="btn btn-primary">
            Check Room
          </a>
        </div>
      </div>
      </div>
          )
      })
}
</div>
      </>
  );
};
