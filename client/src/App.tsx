import "./App.css";
import { Button } from "./components/ui/Button";
import Card from "./components/ui/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
      <Button
        variant={"primary"}
        startIcon={<PlusIcon size={"lg"} />}
        // endIcon={<ShareIcon size={"lg"} />}
        size="sm"
        text={"Add content"}
      ></Button>

      <Button
        variant={"secondary"}
        startIcon={<ShareIcon size={"lg"} />}
        size="sm"
        text={"Share Brain"}
      ></Button>
      </div>
      
      <div className="flex gap-2 ">
        <Card type="youtube" link="https://www.youtube.com/watch?v=N24X8kK7H4Q" title="Best books to read" />
        <Card type="twitter" link="https://x.com/elonmusk/status/1883416606933680469" title="Elon musk" />
      </div>
    </div>
  );
}

export default App;
