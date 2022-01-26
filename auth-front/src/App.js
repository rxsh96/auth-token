import "./App.css";
import Logo from "./components/logo/Logo";
import PopUp from "./components/popup/PopUp";
import UserForm from "./components/userform/UserForm";

function App() {
  return (
    <div className="App">
      <Logo />
      <UserForm />
      <PopUp />
    </div>
  );
}

export default App;
