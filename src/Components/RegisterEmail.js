import React from 'react'
import { Buttons } from './UI/Buttons'
import { InputNumbers } from './UI/InputNumbers'

export const RegisterEmail = () => {
    const input3 = {
        style: "border border-dark",
        type: "text",
        placeholder: "Message",
        name: "Message",
        require: "required",
      };
      const style={
        "width": "100%",
        "padding": "12px",
        "borderRadius": "6px",
      }
      const Bprops = {
        buttonStyle: "btn btn-warning",
        divStyle: "d-flex col-example",
        name: "SEND MESSAGE",
      };
    return (
        <div>
            <div className="m-3 my-5" style={{    "width": "96vw",
    "height": "37vh",
    "backgroundColor":"black"}}>
                <div className="text-white display-6 my-2 px-2">
                Get the best offers first!
                </div>
                <div className="text-white my-3 px-2">
                Join our newsletter.
                </div>
                <div className="text-white my-3 px-2">
                Email
                </div>
                <div className="my-3 px-2">
                    <InputNumbers inputNumber={input3} stylesheet={style}/>
                </div>
                <div className="my-3 px-2">
                    <Buttons button={Bprops} icon={null}/>
                </div>
            </div>
        </div>
    )
}
