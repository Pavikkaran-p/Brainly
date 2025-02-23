import toast from "react-hot-toast";

const copyToClipboard = (textToCopy:any) => {
  console.log("copied")
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Share url copied to clipboard!');
      })
      .catch(err => {
        console.log('Failed to copy text: ', err);
      });
}

export default copyToClipboard