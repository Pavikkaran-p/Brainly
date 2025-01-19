import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <Button variant="primary" size="sm" text="Hello world" startIcon="I" onClick={()=>{console.log("Button clicked")}} ></Button>
    </h1>
  )
}