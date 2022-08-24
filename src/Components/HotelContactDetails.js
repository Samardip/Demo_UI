import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
export const HotelContactDetails = ({ styles }) => {
  return (
    <div>
      <div style={styles.style1}>
        <div style={styles.style2}>
            <div className="d-flex"> <div>
            <RoomIcon />
          </div>
          <div className="mx-2">423 Some adr, Chicago, US</div></div>
         
        </div>
        <div style={styles.style2}>
          <div  className="d-flex">
          <div>
            <LocalPhoneIcon />
          </div>
          <div className="mx-2">Phone: +00 151515</div>
          </div>
        </div>
        <div style={styles.style2}>
          <div  className="d-flex"><div>
            <EmailOutlinedIcon />
          </div>
          <div className="mx-2">Email: mail@mail.com</div></div>
        </div>
      </div>
    </div>
  );
};
