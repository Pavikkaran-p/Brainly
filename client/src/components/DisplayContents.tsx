import Card from "./Card"

const DisplayContents = ({contents}:any) => {
  return (
    <div>
        <div className="flex gap-4 flex-wrap">
            {
              contents.map(({type,link,title}:any,index:number) =>
            <Card key={index} type={type} link={link} title={title} />
            )}
          </div>
    </div>
  )
}

export default DisplayContents