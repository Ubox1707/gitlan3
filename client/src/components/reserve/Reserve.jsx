import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react";
import "./reserve.css"
import useFetch from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`hotels/room/${hotelId}`);
    const [selectedRooms,setSelectedRooms] = useState([]);
    const {dates} = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = []
        while(data <= end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].ednDate);
    
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
        );
        return !isFound;
    };
    

    const handSelect = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked 
            ? [...selectedRooms, value]
             : selectedRooms.filter((item) => item !== value));
    };

    const navigate = useNavigate();

    const handleClick = async ()=> {
        try{
            await Promise.all(
                selectedRooms.map((roomId)=>{
                    const res = axios.put(`/rooms/availability/${roomId}`,
                {
                    dates: alldates,
                });
                return res.data;
                })
            );
            setOpen(false);
            //Có thể điều hướng tới 1 trang hiện các phòng trong khách sạn cho khách chọn, r lm nút tính tiền bên đó
            navigate("/");
        } catch (err){}
    };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" 
        onClick={()=>setOpen(false)}/>
        
        <span>Chọn phòng của bạn: </span>
        {data.map(item =>(
            <div className="rItem">
                <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">Sức chứa:{item.maxPeople}</div>
                    <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                        <label>{roomNumber.number}</label>
                        <input type="checkbox" 
                        value={roomNumber._id} 
                        onChange={handSelect}
                        disabled={!isAvailable(roomNumber)}/>
                    </div>
                ))}
                </div>  
            </div>
             ))}
             <button onClick={handleClick}>Đặt phòng ngay!</button>
      </div>
    </div>
  );
};

export default Reserve
