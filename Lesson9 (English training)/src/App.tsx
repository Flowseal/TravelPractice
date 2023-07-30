import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useDictionaryStore } from "./stores/Dictionary";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Dictionary from "./pages/Dictionary/Dictionary";
import NewWord from "./pages/NewWord/NewWord";
import EditWord from "./pages/EditWord/EditWord";
import Check from "./pages/Check/Check";
import Result from "./pages/Result/Result";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const wordToEdit = useDictionaryStore(state => state.wordToEdit);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="dictionary" element={<Dictionary />} />
          <Route path="new-word" element={<NewWord />} />
          <Route path="edit-word" element={<EditWord wordToEdit={wordToEdit}/>} />
          <Route path="check" element={<Check/>} />
          <Route path="result" element={<Result/>} />
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
