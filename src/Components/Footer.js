import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export const Footer = () => {
    return (
        <div style={{"backgroundColor": "black",
            "height": "40vh",
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "textAlign": "center"
        }}>
            <div className="text-light">
            Find Us On
            </div>
            <div className="text-light my-3">
                <FacebookRoundedIcon />
                <InstagramIcon />
                <TwitterIcon />
                <LinkedInIcon />
            </div>
            <div className="text-light my-2">
                Powered by w3.css
            </div>
        </div>
    )
}
