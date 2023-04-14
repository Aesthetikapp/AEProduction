import React, { useState, useEffect, useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
const PopoverComponent = (props) => {
  console.log("pcomp", props);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        width: "500px",
        height: "850px",
        borderRadius: "10px",
      }}
    >
      <div className="row">
        <div className="col">
          <label
            className="f-fm fm-w7-s14 color-00C3A0"
            style={{
              paddingBottom: "25px",
              paddingRight: "25px",
              paddingTop: "15px",
              float: "right",
            }}
          >
            Auto-accepted&nbsp;&nbsp;
            <img src="images/rightmark.png" alt="rightmark"></img>
          </label>
        </div>
      </div>

      <div className="row" style={{ paddingLeft: "22px" }}>
        <div className="col-2">
          <img
            src="images/imgfemale.png"
            style={{ width: "50px", height: "50px" }}
            alt="imgfemale"
          ></img>
        </div>
        <div className="col-8">
          <div className="row" style={{ marginLeft: "-30px" }}>
            <div className="col">
              <label className="f-fm fm-w7-s24 color-00">Savannah Nguyen</label>
            </div>
          </div>
          <div className="row" style={{ marginLeft: "-30px" }}>
            <div className="col">
              <label>
                <img src="images/gender.png" alt="gender"></img>
              </label>
              &nbsp;&nbsp;
              <label className="f-fm fm-w6-s14 color-00">32</label>
            </div>
          </div>
        </div>

        <div className="col-2" style={{ marginLeft: "-22px" }}>
          <label
            style={{
              border: "1px solid #D6D6D6",
              width: "45px",
              borderRadius: "22px",
              height: "45px",
              float: "right",
            }}
          >
            <img
              src="images/Vector.png"
              alt="Vector"
              style={{
                padding: "11px",
              }}
            ></img>
          </label>
        </div>

        <div className="row">
          <div className="col">
            <hr
              style={{
                color: "rgb(149 142 142)",
                backgroundColor: "#000000",
                height: "1px",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label
              className="f-fm fm-w6-s12 color-AC"
              style={{ paddingBottom: "5px" }}
            >
              TIME AND LOCATION
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "3px" }}>
            <label style={{ width: "14px", height: "14px" }}>
              <img
                style={{ width: "14px", height: "14px", Color: "#777777" }}
                src="images/time.png"
                alt="time"
              ></img>
            </label>
            &nbsp;&nbsp;
            <label className="f-fm fm-w4-s12 color-7">
              june 20,2022 09:00AM-10:00AM
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "25px" }}>
            <label>
              <img
                style={{ width: "14px", height: "14px", Color: "#777777" }}
                src="images/map.png"
                alt="map"
              ></img>
            </label>
            &nbsp;&nbsp;
            <label className="f-fm fm-w4-s12 color-7">
              Street address001,City02,Province03,Country,Zipcode
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "5px" }}>
            <label className="f-fm fm-w6-s12 color-AC">TREATMENT</label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "3px" }}>
            <label className="f-fm fm-w6-s16 color-00">Aquashine</label>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "25px" }}>
            <img src="images/injection.png" alt="injection"></img>&nbsp;
            <label className="f-fm fm-w6-s14 color-00">x2</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label className="f-fm fm-w7-s14 " style={{ color: "#AF805E" }}>
              $182
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "5px" }}>
            <label className="f-fm fm-w6-s12 color-AC">CONSULTATION</label>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "3px" }}>
            <iframe
              width="200px"
              height="122px"
              src={`https://www.youtube.com/embed/qK5e25XlrZ8`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "5px" }}>
            <label className="f-fm fm-w3-s10 color-00">
              june 15,2022&nbsp;&nbsp; 06:20PM
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "25px" }}>
            <label className="f-fm fm-w3-s10 color-00">Duration:00:12:03</label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "5px" }}>
            <label className="f-fm fm-w6-s12 color-AC">ALLERGY</label>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ paddingBottom: "25px" }}>
            <label className="f-fm fm-w5-s14 color-00">N/A</label>
          </div>
        </div>

        <div className="row">
          <div className="col" style={{ paddingBottom: "5px" }}>
            <label className="f-fm fm-w6-s12 color-Ac">TREATMENT HISTORY</label>
          </div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{ paddingBottom: "5px", textAlign: "center" }}
          >
            <label
              style={{
                width: "429px",
                height: "68px",
                background: "#acacac36",
                borderRadius: "10px",
                float: "left",
              }}
            >
              <label
                className="f-fm fm-w5-s12 color-00"
                style={{ paddingTop: "20px" }}
              >
                -No previous history-
              </label>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <hr
              style={{
                color: "rgb(149 142 142)",
                backgroundColor: "#000000",
                height: "1px",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label
              style={{
                border: "1px solid #D6D6D6",
                width: "45px",
                borderRadius: "22px",
                height: "45px",
              }}
            >
              <img
                src="images/phone.png"
                alt="phone"
                style={{
                  padding: "14px",
                }}
              ></img>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label
              style={{
                border: "1px solid #D6D6D6",
                width: "45px",
                borderRadius: "22px",
                height: "45px",
              }}
            >
              <img
                src="images/email1.png"
                alt="email1"
                style={{
                  padding: "14px",
                }}
              ></img>
            </label>
          </div>
          <div className="col-8" style={{ paddingLeft: "40px" }}>
            <select
              className="dropdown"
              style={{
                textAlign: "center",
                width: "159px",
                borderRadius: "22.5px",
                height: "45px",
                background: "#F4F4F4",
                float: "right",
              }}
              //   onChange={(val) => handler(val.target.value)}
            >
              <option value="5" selected>
                Reschedule
              </option>
              <option>Remove</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    // <Popover id="popover-basic" style={{ maxWidth: "518px" }}>
    //   <Popover.Body>

    //   </Popover.Body>
    // </Popover>
  );
};

export default PopoverComponent;
