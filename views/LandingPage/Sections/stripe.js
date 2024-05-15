import React, { useEffect } from "react";
//import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";

//import "react-chat-widget/lib/styles.css";
//import logo from "assets/img/faces/test1.jpg";
// import logo from "./logo.svg";

function App() {
  useEffect(() => {
    //addResponseMessage("Welcome to this **awesome** chat!");
  }, []);

  // const handleNewUserMessage = (newMessage) => {
  //console.log(`New message incoming! ${newMessage}`);
  // Now send the message throught the backend API
  // isWidgetOpened(false);
  //toggleWidget();
  // };
  //   const getCustomLauncher = (handleToggle) => (
  //     <button onClick={handleToggle}>This is my launcher component!</button>
  //   );
  return (
    <div className="App">
      {/* <Widget 
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        // launcher={(handleToggle) => getCustomLauncher(handleToggle)}
        title="My new awesome title"
        subtitle="And my cool subtitle"
  />*/}
    </div>
  );
}

export default App;
