// Style
import "./App.css";

// Components
import AppConsummer from "./AppConsummer";

// Context
import AppProvider from "./AppProvider";

function App() {
  return (
    <AppProvider>
      <AppConsummer />
    </AppProvider>
  );
}

export default App;
