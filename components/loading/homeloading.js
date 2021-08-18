const HomeLoading = () => (
  <div className="timeline_wrapper">
    <div className="timeline_item">
      <div className="firstanimatedContainer">
        <div className="animatedbackground image">
          <div />
        </div>
      </div>

    </div>
    <div className="sectimeline_item">

    </div>
    <style jsx>{`
  .timeline_wrapper{
    color: #2d2d2d;
    margin: 0 auto;
    width: 100%;
    padding: 4%;
  }
  .timeline_item {
    background: #fff;
    border-radius: 3px;
    display: flex;

  }
  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }

  .animatedbackground {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: inherit;
    position: relative;
    border-radius: 5px;

  }
  .firstanimatedContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
  }
  .firstanimatedContainer:first-child{
    margin-top: 0px;
  }

  .des{
    width: 100%;
    height: 25px;
    width: auto;
  }

  .image{
    width: 100%;
    height: 576px;

  }



  @media(max-width:1200px){
    .timeline_item {
      flex-direction: column;
    }
    .secondanimatedContainer{
      margin-left: 0;
    }
    .image{
      width: 100%;
      height: 300px;
    }

  }
  @media(max-width:480px){
    .image{
      height:144px;
    }
  }
  `}</style>
  </div>

)
export default HomeLoading;