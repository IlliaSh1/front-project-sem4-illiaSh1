import "./App.css";

import MainRouter from "./app/routing";

import { AuthProvider } from "./context/authContext";
import { ApiProvider } from "./context/apiContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { WrapperStyle } from "./components/Wrapper/Wrapper.styles";
import { MainStyle } from "./components/Main";

function App() {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <ApiProvider>
            {/* Header */}
            <Header />
            {/* Main */}
            <MainStyle className="main">
              <WrapperStyle className="wrapper main__content" display="flex">
                <MainRouter />
              </WrapperStyle>
            </MainStyle>
            {/* Footer */}
            <Footer />
          </ApiProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
