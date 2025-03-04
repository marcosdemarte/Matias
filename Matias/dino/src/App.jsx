import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <div class="background1"></div>
      <Routes />
    </AuthProvider>
  );
}

export default App;
