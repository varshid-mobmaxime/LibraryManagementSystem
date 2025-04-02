// import React, { useState } from 'react';
// import '../style.css';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';

// function ChatInput(props) {
//   const activeChannelId = 1;
//   const { className, onSubmit } = props;
//   const [value, setValue] = useState('');

//   const onClick = () => {
//     if (value) {
//       onSubmit(value);
//       setValue('');
//     }
//   };

//   const onKeyDown = (e) => {
//     if (e.code === 'Enter') {
//       onClick();
//     }
//   };

//   return (
//     <div
//       className={
//         classNames(
//           'd-flex flex-column',
//           className,
//         )
//       }
//     >
//       <div className="d-flex flex-row">
//         <button type="button" className="btn btn-outline-primary rounded-circle border-0 w-40px h-40px">
//           <i className="fas fa-plus-circle" />
//         </button>
//         <button type="button" className="btn btn-outline-primary rounded-circle border-0 w-40px h-40px">
//           <i className="fas fa-image" />
//         </button>
//         <button type="button" className="btn btn-outline-primary rounded-circle border-0 w-40px h-40px">
//           <i className="fas fa-sticky-note" />
//         </button>
//         <button type="button" className="btn btn-outline-primary rounded-circle border-0 w-40px h-40px">
//           <i className="fas fa-file" />
//         </button>
//       </div>
//       <div className="input-group">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Aa"
//           aria-label="ChatInput"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={onKeyDown}
//         />
//         <div className="input-group-append">
//           <button type="button" disabled={activeChannelId <= 0} className="btn btn-primary" onClick={onClick}>
//             <i className="fas fa-paper-plane" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// ChatInput.propTypes = {
//   className: PropTypes.string,
//   onSubmit: PropTypes.func,
// };

// ChatInput.defaultProps = {
//   className: null,
//   onSubmit: null,
// };

// export default ChatInput;

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SendChat } from "../../../../redux/actions/ChatActions";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const onSend = useCallback(() => {
    if (!message.trim()) {
      return;
    }

    const payload = {
      message: message,
    };
    dispatch(
      SendChat("6779b8b1dba2aa2b26acbb4a", payload, (success, result) => {
        if (success) {
          console.log("Message sent successfully");
          setMessage("");
        }
      })
    );
  }, [dispatch, message]);

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="form-control"
      />
      <button
        // onClick={onSend}
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
