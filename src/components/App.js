import { useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase';
import { useEffect } from 'react';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  console.log(authService.currentUser)
  useEffect(() => {
    // 최초 authState 확인 시 로그인 되지 않더라도, 해당 callback이 호출 됨
    // 로그인 되지 않을 경우에는 null -> null 로 변경이 없는데도 callback이 실행되네...
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
      console.log({user})
    })
  }, [])
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
