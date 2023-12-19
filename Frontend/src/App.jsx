import Navbar from "./component/Navbar";
import Router from "./component/Router";
import "./App.css";

export default function App() {
    return (
        <>
            <Navbar />
            <main className="">
                <Router />
            </main>
        </>
    );
}

// import React from 'react';
// import Login from './Login';

// const App = () => {
//   return (
//     <div>
//       <h1>Selamat datang di Aplikasi Mahasiswa</h1>
//       <Login />
//     </div>
//   );
// };

// export default App;
