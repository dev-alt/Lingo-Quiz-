import  Toast  from 'react-toastify'; 

const CustomToast = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">
        {/* Add your custom icon based on type (success, error, etc.) */}
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );
};