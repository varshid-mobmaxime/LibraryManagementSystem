// import React from 'react';
// import PropTypes from 'prop-types';
// import uuid from 'react-uuid';
// import ChatItem from '../ChatItem/ChatItem';
// import '../style.css';

// function ChatList(props) {
//   const { dataSource, onItemClick, activeId } = props;
//   return (
//     <div className="list-group">
//       {
//         dataSource.map((item) => (
//           <ChatItem
//             onItemClick={onItemClick}
//             key={uuid()}
//             id={item.id}
//             data={item}
//             active={item.id === activeId}
//           />
//         ))
//       }
//     </div>
//   );
// }

// ChatList.propTypes = {
//   dataSource: PropTypes.arrayOf(ChatItem.propTypes.data),
//   onItemClick: PropTypes.func,
//   activeId: PropTypes.number,
// };

// ChatList.defaultProps = {
//   dataSource: [],
//   onItemClick: null,
//   activeId: null,
// };

// export default ChatList;

import React from "react";

const ChatList = ({ users, selectUser }) => {
  return (
    <div className="chat-list">
      <h2>Chat Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id} onClick={() => selectUser(user)}>
            <img src={user.avatar} alt={user.name} width="40" height="40" />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
