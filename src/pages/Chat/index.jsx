import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../../assets/logo.png";
import SubscriptionPopup from "./SubscriptionPopup";
import "./Chat.scss";

function Chat() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    addResponseMessage("Welcome to this **awesome** chat!");
    handleOpen();
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  const getCustomLauncher = (handleToggle) => (
    <button onClick={handleToggle}>This is my launcher component!</button>
  );

  return (
    <div className="chat">
      <div id="container">
        <aside>
          <header>
            <input type="text" placeholder="search" />
          </header>
          <ul>
            <li>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
                alt=""
              />
              <div>
                <h2>Tamil2</h2>
                {/* <h3>
                  <span class="status orange"></span>
                  offline
                </h3> */}
              </div>
            </li>
            <li>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg"
                alt=""
              />
              <div>
                <h2>Neel</h2>
                {/* <h3>
                  <span class="status green"></span>
                  online
                </h3> */}
              </div>
            </li>
            <li>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg"
                alt=""
              />
              <div>
                <h2>Parhti</h2>
                {/* <h3>
                  <span class="status orange"></span>
                  offline
                </h3> */}
              </div>
            </li>
            <li>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_04.jpg"
                alt=""
              />
              <div>
                <h2>Tamil2</h2>
                {/* <h3>
                  <span class="status green"></span>
                  online
                </h3> */}
              </div>
            </li>
            <li>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_05.jpg"
                alt=""
              />
              <div>
                <h2>Tamil2</h2>
                {/* <h3>
                  <span class="status orange"></span>
                  offline
                </h3> */}
              </div>
            </li>
          </ul>
        </aside>
        <main>
          <header>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
              alt=""
            />
            <div>
              <h2>Chat with Vincent Porter</h2>
              <h3>already 1902 messages</h3>
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
              alt=""
            />
          </header>
          <ul id="chat">
            <li class="you">
              <div class="entete">
                <span class="status green"></span>
                <h2>Vincent</h2>
                <h3>10:12AM, Today</h3>
              </div>
              <div class="triangle"></div>
              <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li class="me">
              <div class="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span class="status blue"></span>
              </div>
              <div class="triangle"></div>
              <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li class="me">
              <div class="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span class="status blue"></span>
              </div>
              <div class="triangle"></div>
              <div class="message">OK</div>
            </li>
            <li class="you">
              <div class="entete">
                <span class="status green"></span>
                <h2>Vincent</h2>
                <h3>10:12AM, Today</h3>
              </div>
              <div class="triangle"></div>
              <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li class="me">
              <div class="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span class="status blue"></span>
              </div>
              <div class="triangle"></div>
              <div class="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li class="me">
              <div class="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span class="status blue"></span>
              </div>
              <div class="triangle"></div>
              <div class="message">OK</div>
            </li>
          </ul>
          <footer>
            <textarea placeholder="Type your message"></textarea>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
              alt=""
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
              alt=""
            />
            <a href="#">Send</a>
          </footer>
        </main>
      </div>
      <SubscriptionPopup open={open} handleClose={handleClose} />
    </div>
  );
}

export default Chat;
