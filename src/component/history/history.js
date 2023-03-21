import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import "./history.css";
import { setFetchApi } from '../../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../../redux/historyslice';
import { v4 } from 'uuid';

function History(){
  const dispatch =useDispatch();
  let history = useSelector(store=> store.history.value);
  let toggle = useSelector(store=>store.toggle.value);

  function searchAgain(text){
    dispatch(setFetchApi(text));
    dispatch(addToHistory({search : text , id: v4()}));

  }

   return(
    <div className={toggle? "history-body":"history-body-toggle"}>
     <p className='total-history'>{history.length} searches</p>
    {history.map((history)=>{
      return(
        <Link to="/" key = {history?.id}>
       <div className='history-container' onClick={()=>searchAgain(history?.search)}>
        <div>
         <h1 className='history-texts'>{history?.search}</h1>
        </div>
        <div>
         <span className="material-icons go">launch</span>
         </div>
       </div>
       </Link>
      )
    })}
    </div>
   )
}

export default History;