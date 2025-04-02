// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import ChatHttpServer from "../../utils/ChatHttpServer";
// import ChatSocketServer from "../../utils/ChatSocketServer";
// import "./Chat.css";
// import { Card, Layout } from "antd";
// import { Content, Footer, Header } from "antd/es/layout/layout";
// import { GiftedChat } from "react-web-gifted-chat";

// const Chat = () => {
//   //   const history = useRoutes();
//   const [isOverlayVisible, setIsOverlayVisible] = useState(true);
//   const [username, setUsername] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userId, setUserId] = useState(null);

//   // Logout function
//   const logout = async () => {
//     try {
//       await ChatHttpServer.removeLS();
//       ChatSocketServer.logout({ userId });

//       ChatSocketServer.eventEmitter.on("logout-response", () => {
//         // history.push(`/`);
//       });
//     } catch (error) {
//       console.error(error);
//       alert("This App is Broken, we are working on it. Try after some time.");
//     }
//   };

//   // Fetch user details on mount
//   useEffect(() => {
//     const initializeUser = async () => {
//       try {
//         setIsOverlayVisible(true);
//         const fetchedUserId = await ChatHttpServer.getUserId();
//         setUserId(fetchedUserId);

//         const response = await ChatHttpServer.userSessionCheck(fetchedUserId);
//         if (response.error) {
//           //   history.push(`/`);
//         } else {
//           setUsername(response.username);
//           ChatHttpServer.setLS("username", response.username);
//           ChatSocketServer.establishSocketConnection(fetchedUserId);
//         }
//         setIsOverlayVisible(false);
//       } catch (error) {
//         setIsOverlayVisible(false);
//         // history.push(`/`);
//       }
//     };

//     initializeUser();
//   }, []);

//   const { isAdmin } = useSelector((state) => state.auth);

//   const contentStyle = {
//     textAlign: "center",
//     minHeight: 120,
//     lineHeight: "120px",
//     color: "#fff",
//     backgroundColor: "#0958d9",
//   };
//   const headerStyle = {
//     textAlign: "center",
//     color: "#fff",
//     height: 64,
//     paddingInline: 48,
//     lineHeight: "64px",
//     backgroundColor: "#4096ff",
//   };

//   const siderStyle = {
//     textAlign: "center",
//     lineHeight: "120px",
//     color: "#fff",
//     backgroundColor: "#1677ff",
//   };
//   const footerStyle = {
//     textAlign: "center",
//     color: "#fff",
//     backgroundColor: "#4096ff",
//   };
//   const layoutStyle = {
//     borderRadius: 8,
//     // overflow: "hidden",
//     // width: "calc(100% - 8px)",
//     // maxWidth: "calc(100% - 8px)",
//   };

//   return (
//     // <div className="App">
//     //   <div className={isOverlayVisible ? "overlay" : "visibility-hidden"}>
//     //     <h1>Loading</h1>
//     //   </div>

//     //   <main role="main" className="container content">
//     //     <div className="row chat-content">
//     //       {/* <div className="col-3 chat-list-container">
//     //         {!isOverlayVisible && (
//     //           <ChatList userId={userId} updateSelectedUser={setSelectedUser} />
//     //         )}
//     //       </div> */}
//     //       <div className="col-8 message-container">
//     //         {!isOverlayVisible && (
//     //           <Conversation userId={userId} newSelectedUser={selectedUser} />
//     //         )}
//     //       </div>
//     //     </div>
//     //   </main>
//     // </div>

//     // <main class="content">
//     //   <div class="container p-0">
//     //     <h1 class="h3 mb-3">Messages</h1>

//     //     <div class="card">
//     //       <div class="row g-0">
//     //         <div class="col-12 col-lg-5 col-xl-3 border-right">
//     //           <div class="px-4 d-none d-md-block">
//     //             <div class="d-flex align-items-center">
//     //               <div class="flex-grow-1">
//     //                 <input
//     //                   type="text"
//     //                   class="form-control my-3"
//     //                   placeholder="Search..."
//     //                 />
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <a
//     //             href="#"
//     //             class="list-group-item list-group-item-action border-0"
//     //           >
//     //             <div class="badge bg-success float-right">5</div>
//     //             <div class="d-flex align-items-start">
//     //               <img
//     //                 src="https://bootdey.com/img/Content/avatar/avatar5.png"
//     //                 class="rounded-circle mr-1"
//     //                 alt="Vanessa Tucker"
//     //                 width="40"
//     //                 height="40"
//     //               />
//     //               <div class="flex-grow-1 ml-3">
//     //                 Vanessa Tucker
//     //                 <div class="small">
//     //                   <span class="fas fa-circle chat-online"></span> Online
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           </a>

//     //           <hr class="d-block d-lg-none mt-1 mb-0" />
//     //         </div>
//     //         <div class="col-12 col-lg-7 col-xl-9">
//     //           <div class="py-2 px-4 border-bottom d-none d-lg-block">
//     //             <div class="d-flex align-items-center py-1">
//     //               <div class="position-relative">
//     //                 <img
//     //                   src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                   class="rounded-circle mr-1"
//     //                   alt="Sharon Lessman"
//     //                   width="40"
//     //                   height="40"
//     //                 />
//     //               </div>
//     //               <div class="flex-grow-1 pl-3">
//     //                 <strong>Sharon Lessman</strong>
//     //                 <div class="text-muted small">
//     //                   <em>Typing...</em>
//     //                 </div>
//     //               </div>
//     //               <div>
//     //                 <button class="btn btn-primary btn-lg mr-1 px-3">
//     //                   <svg
//     //                     xmlns="http://www.w3.org/2000/svg"
//     //                     width="24"
//     //                     height="24"
//     //                     viewBox="0 0 24 24"
//     //                     fill="none"
//     //                     stroke="currentColor"
//     //                     stroke-width="2"
//     //                     stroke-linecap="round"
//     //                     stroke-linejoin="round"
//     //                     class="feather feather-phone feather-lg"
//     //                   >
//     //                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//     //                   </svg>
//     //                 </button>
//     //                 <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
//     //                   <svg
//     //                     xmlns="http://www.w3.org/2000/svg"
//     //                     width="24"
//     //                     height="24"
//     //                     viewBox="0 0 24 24"
//     //                     fill="none"
//     //                     stroke="currentColor"
//     //                     stroke-width="2"
//     //                     stroke-linecap="round"
//     //                     stroke-linejoin="round"
//     //                     class="feather feather-video feather-lg"
//     //                   >
//     //                     <polygon points="23 7 16 12 23 17 23 7"></polygon>
//     //                     <rect
//     //                       x="1"
//     //                       y="5"
//     //                       width="15"
//     //                       height="14"
//     //                       rx="2"
//     //                       ry="2"
//     //                     ></rect>
//     //                   </svg>
//     //                 </button>
//     //                 <button class="btn btn-light border btn-lg px-3">
//     //                   <svg
//     //                     xmlns="http://www.w3.org/2000/svg"
//     //                     width="24"
//     //                     height="24"
//     //                     viewBox="0 0 24 24"
//     //                     fill="none"
//     //                     stroke="currentColor"
//     //                     stroke-width="2"
//     //                     stroke-linecap="round"
//     //                     stroke-linejoin="round"
//     //                     class="feather feather-more-horizontal feather-lg"
//     //                   >
//     //                     <circle cx="12" cy="12" r="1"></circle>
//     //                     <circle cx="19" cy="12" r="1"></circle>
//     //                     <circle cx="5" cy="12" r="1"></circle>
//     //                   </svg>
//     //                 </button>
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <div class="position-relative">
//     //             <div class="chat-messages p-4">
//     //               <div class="chat-message-right pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:33 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Lorem ipsum dolor sit amet, vis erat denique in, dicunt
//     //                   prodesset te vix.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:34 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
//     //                   erat animal commodo.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-right mb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:35 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Cum ea graeci tractatos.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:36 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Sed pulvinar, massa vitae interdum pulvinar, risus lectus
//     //                   porttitor magna, vitae commodo lectus mauris et velit.
//     //                   Proin ultricies placerat imperdiet. Morbi varius quam ac
//     //                   venenatis tempus.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:37 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Cras pulvinar, sapien id vehicula aliquet, diam velit
//     //                   elementum orci.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-right mb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:38 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Lorem ipsum dolor sit amet, vis erat denique in, dicunt
//     //                   prodesset te vix.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:39 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
//     //                   erat animal commodo.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-right mb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:40 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Cum ea graeci tractatos.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-right mb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:41 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Morbi finibus, lorem id placerat ullamcorper, nunc enim
//     //                   ultrices massa, id dignissim metus urna eget purus.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:42 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Sed pulvinar, massa vitae interdum pulvinar, risus lectus
//     //                   porttitor magna, vitae commodo lectus mauris et velit.
//     //                   Proin ultricies placerat imperdiet. Morbi varius quam ac
//     //                   venenatis tempus.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-right mb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar1.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Chris Wood"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:43 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//     //                   <div class="font-weight-bold mb-1">You</div>
//     //                   Lorem ipsum dolor sit amet, vis erat denique in, dicunt
//     //                   prodesset te vix.
//     //                 </div>
//     //               </div>

//     //               <div class="chat-message-left pb-4">
//     //                 <div>
//     //                   <img
//     //                     src="https://bootdey.com/img/Content/avatar/avatar3.png"
//     //                     class="rounded-circle mr-1"
//     //                     alt="Sharon Lessman"
//     //                     width="40"
//     //                     height="40"
//     //                   />
//     //                   <div class="text-muted small text-nowrap mt-2">
//     //                     2:44 am
//     //                   </div>
//     //                 </div>
//     //                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//     //                   <div class="font-weight-bold mb-1">Sharon Lessman</div>
//     //                   Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
//     //                   erat animal commodo.
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <div class="flex-grow-0 py-3 px-4 border-top">
//     //             <div class="input-group">
//     //               <input
//     //                 type="text"
//     //                 class="form-control"
//     //                 placeholder="Type your message"
//     //               />
//     //               <button class="btn btn-primary">Send</button>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </main>

//     // <div className=" bg-danger">
//     //   <Layout
//     //     style={{
//     //       borderRadius: 8,
//     //       overflow: "hidden",
//     //       width: "calc(50% - 8px)",
//     //       maxWidth: "calc(50% - 8px)",
//     //     }}
//     //   >
//     //     <Card style={{ width: "100%", minWidth: "90%", flex: 1 }}>
//     //       <div className="w-100">Header</div>
//     //       <div>Chat Body</div>
//     //       <div>Chat Input</div>
//     //     </Card>
//     //   </Layout>

//     //   {/* <Layout style={{ width: "90%", height: "90%" }}>
//     //     <Header style={headerStyle}>Header</Header>
//     //     <Content style={contentStyle}>Content</Content>
//     //     <Footer style={footerStyle}>Footer</Footer>
//     //   </Layout> */}
//     // </div>

//     <div style={{ flex: 1, height: "300px" }}></div>
//   );
// };

// export default Chat;

// // import React, { useState } from "react";
// // import SideBar from "./Component/SideBar/SideBar";
// // import SearchInput from "./Component/SearchInput/SearchInput";
// // import ChatList from "./Component/ChatList/ChatList";
// // import ChatInput from "./Component/ChatInput/ChatInput";
// // import MessageList from "./Component/MessageList/MessageList";
// // import MessageListHeader from "./Component/MessageListHeader/MessageListHeader";
// // // import "@fortawesome/fontawesome-free/js/fontawesome";
// // // import "@fortawesome/fontawesome-free/js/solid";
// // // import "@fortawesome/fontawesome-free/js/regular";
// // // import "@fortawesome/fontawesome-free/js/brands";
// // import "./Chat.css";

// // const MAX_NUM_MESSAGES = 50;

// // const initialMessages = [
// //   {
// //     isMe: true,
// //     message: "This is a message",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "This is a reply",
// //   },
// //   {
// //     isMe: false,
// //     message: "End",
// //   },
// // ];

// // const messagesToAppend = [
// //   {
// //     isMe: true,
// //     message: "Message",
// //   },
// //   {
// //     isMe: false,
// //     message: "Message",
// //   },
// //   {
// //     isMe: false,
// //     message: "Message",
// //   },
// // ];

// // function Chat() {
// //   const [activeChannelId, setActiveChannelId] = useState(0);
// //   const [triggerScrollToBottom, setTriggerScrollToBottom] = useState(false);
// //   const [messagesModel, setMessagesModel] = useState(initialMessages);

// //   const onItemClick = (id) => {
// //     setActiveChannelId(id);
// //     setTriggerScrollToBottom(!triggerScrollToBottom);
// //   };

// //   const onSend = (message) => {
// //     if (messagesModel.length <= 30) {
// //       setMessagesModel([
// //         ...messagesModel,
// //         {
// //           isMe: true,
// //           message,
// //         },
// //       ]);
// //     }
// //     setTriggerScrollToBottom(!triggerScrollToBottom);
// //   };

// //   const next = () => {
// //     if (messagesModel.length <= MAX_NUM_MESSAGES) {
// //       setMessagesModel([...messagesToAppend, ...messagesModel]);
// //     }
// //   };

// //   const channelsModel = [
// //     {
// //       id: 1,
// //       title: "Channel 1",
// //       date: "2022-01-01",
// //       subtitle: "This is a message",
// //     },
// //     {
// //       id: 2,
// //       title: "Channel 2",
// //       date: "2021-12-03",
// //       subtitle: "Hello, get started",
// //     },
// //   ];

// //   return (
// //     <div className="d-flex flex-row w-100 h-100 card shadow">
// //       <div className="chat-list">
// //         <SideBar
// //           top={<SearchInput />}
// //           center={
// //             <ChatList
// //               dataSource={channelsModel}
// //               onItemClick={onItemClick}
// //               activeId={activeChannelId}
// //             />
// //           }
// //         />
// //       </div>
// //       <div className="flex-1 d-flex flex-column">
// //         <div className="rounded-0 shadow">
// //           <MessageListHeader data={{ title: "Channel Name", avatarUrl: "" }} />
// //         </div>
// //         <div className="message-list flex-1 mh-100 h-100 overflow-auto">
// //           <MessageList
// //             dataSource={messagesModel}
// //             triggerScrollToBottom={triggerScrollToBottom}
// //             channelId={activeChannelId}
// //             next={next}
// //             hasMore={messagesModel.length <= MAX_NUM_MESSAGES}
// //           />
// //         </div>
// //         <ChatInput onSubmit={onSend} className="mx-3 mb-3" />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Chat;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatList } from "../../redux/actions/ChatActions";
import "./Chat.css";
import { io } from "socket.io-client";

import ChatInput from "./Component/ChatInput/ChatInput";
import MessageList from "./Component/MessageList/MessageList";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();

  const { userData } = useSelector((state) => state.auth);

  const [messageData, setMessageData] = useState();

  useEffect(() => {
    // if (currentUser) {
    // socket.current = io("http://localhost:5001");
    // socket.current.emit("add-user", userData._id);
    // }
  }, [userData._id]);

  useEffect(() => {
    dispatch(
      getAllChatList("6779b8b1dba2aa2b26acbb4a", (isSuccess, message) => {
        console.log("Chat List DATA is =--> ", message);
        isSuccess && setMessageData(message);
      })
    );
  }, [dispatch]);

  return (
    <div className="chat-page ">
      {/* <div className="chat-list-container">
        <ChatList />
      </div> */}
      <div className="message-list-container">
        <MessageList messageData={messageData} />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
