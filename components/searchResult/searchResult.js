
import { useContext, useState } from "react";
import { LangContext } from '../../constants/langcontext';
import { getSearchLocal, setSearchLocal } from "../../localStorage/localStorage";



const SearchResult = ({ recent, result, search, suggestions, suggestionSelected, handleSearch }) => {

    let items = getSearchLocal();
    const { lang } = useContext(LangContext);

    const [searchResults, setSearchResults] = useState(items.length > 0 ? items : []);

    let filterResults = (searchResults) => searchResults !== undefined && localStorage.getItem("search items").length !== '' ?
        searchResults.filter((v, i) => searchResults.indexOf(v) === i)
        : null;
    const [item_arr, setItemArr] = useState(filterResults(searchResults));

    let recent_search = items.length === 0 ? 'No recent searches' : recent;

    const handleRemove = (index, item) => (e) => {

        let new_arr = item_arr.filter((item_ar) => item_ar !== item)
        setSearchLocal(new_arr.length !== 0 ? new_arr : []);
        setItemArr(new_arr);

    }


    return (
        <React.Fragment>
            {
                search.length === 0 ?
                    (
                        <div className={items.length > 4 ? "search_results scroll_search" : "search_results"}>
                            <p style={{ paddingLeft: "24px" }}>{search.length === 0 ? recent_search : result}</p>

                            {

                                item_arr.reverse().map((item, i) => {
                                    return (<div className="search_result" key={i} >
                                        <div onClick={(e) => handleSearch(item)} className="recent_item">{item}</div>

                                        <i className="fa fa-times" aria-hidden="true" onClick={handleRemove(i, item)}></i>

                                    </div>
                                    )
                                })

                            }
                        </div>
                    )
                    :
                    (
                        <div className="search_results">
                            <p style={{ paddingLeft: "24px" }}>{search.length === 0 ? recent_search : result}</p>
                            {
                                suggestions.map((item, i) => (
                                    <div className="search_suggestion" onClick={(e) => suggestionSelected(item)} >
                                        {item}
                                    </div>
                                ))
                            }

                        </div>

                    )

            }


            <style jsx>
                {
                    `
                .search_results{
                    width:49.3rem;
                    height:auto;
                    border-radius:2px;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    position:absolute;
                    top:104px;
                    color:#394358;
                    background-color:#fff;
                    z-index:1;
                    border-top:1px solid #979797;
                    box-shadow:0 5px 10px 0 rgba(0,0,0,0.1);
                    
                    padding-top:21px;
                    padding-bottom:24px;
                    margin-left:-15px;
                    cursor:pointer;
                  }
                  .scroll_search{
                    height:226px;
                    overflow-y:scroll;
                  }
                  .scroll_search ::-webkit-scrollbar {
                    display: none;
                  }
                  .search_suggestion{
                      padding-left:24px;
                      padding-top:10px;
                      padding-bottom:10px;
                  }
                  .search_suggestion:hover{
                      background-color:#f6f6f6;
                    
                      
                  }
                  .recent_item{
                      width:666px;

                  }
                  .search_panel{
                      position:absolute;
                      top:0px;
                  }
                  .search_results p{
                    font-size:14px;
                    font-weight:500;
                    color:#394358;
                    opacity:0.4;
                  }
                  .search_results div{
                    padding-top:5px;
                    padding-bottom:3px;
                  }
                  .search_result{
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      padding-left:24px;
                     
                  }
                  .search_result:hover{
                      background-color:#f6f6f6;
                  }
                  .search_result i{
                      padding-right:30px;
                  }
                  @media(max-width:1500px){
                      .search_results{
                          width:48.1rem;
                      }
                  }
                 

                  @media(max-width:1200px){
                      .search_results{
                          width:53.5%;
                      }
                  }
                  @media(max-width:876px){
                    .search_results{
                        width:56.5%;
                        margin-top:-42px;
                    }
                  }

                  @media(max-width:480px){
                      .search_results{
                          width:65.5%;
                          margin-left:-11px;
                      }
                  }
                  @media(max-width:320px){
                      .search_results{
                          width:64.5%;
                      }
                  }
                
                `
                }
            </style>
        </React.Fragment>


    )
}

export default SearchResult;