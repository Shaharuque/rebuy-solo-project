
const useToken = () => {
    // Decrypt the access token from localStorage
    const token = localStorage.getItem('token') || null;
  
    return { token };
  };
  
export default useToken;