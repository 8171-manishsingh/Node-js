import { useContext } from "react";
import Todo from "./components/Todo";
import Modal from "./components/Modal";
import { AppContext } from "./contexts/AppContext";

const App = () => {
  const { light, view } = useContext(AppContext);

  const bgClass = light ? "bg-neutral-700" : "bg-white";

  return (
    <main
      className={`relative flex items-center justify-center min-h-screen ${bgClass} transition-all duration-200 ease-in-out`}
    >
      {/* Overlay */}
      {view && (
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
      )}

      {/* Content */}
      <div className="relative z-0">
        <Todo />
      </div>

      {/* Modal */}
      {view && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Modal />
        </div>
      )}
    </main>
  );
};

export default App;
