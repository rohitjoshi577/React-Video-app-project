import { useSelector} from 'react-redux';


function History(){
  let history = useSelector(store=> store.history.value);
   return(
    <>
    {history.map((history)=>{
      return(
      <h1 key = {history.id}>{history.search}</h1>
      )
    })}
    </>
   )
}

export default History;