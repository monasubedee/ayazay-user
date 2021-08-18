const productDetailLoading = () => (
  <div className="timeline_wrapper">
    <div className="timeline_item">
      <div className="firstanimatedContainer">
        <div className="animatedbackground title">
          <div />
        </div>
        <div className="animatedbackground account">
          <div className="account" />
        </div>
        <div className="animatedbackground image">
        </div>
        <div className="animatedbackground sm_img">
        </div>
      </div>
      <div className="secondanimatedContainer">
        <div className="animatedbackground des">
          <div />
        </div>
        <div className="animatedbackground des_2">
          <div className="account" />
        </div>
        <div className="animatedbackground des_3">
          <div />
        </div>
        <div className="animatedbackground sm_img">
        </div>
        <div className="animatedbackground des_3">
        </div>
        <div className="animatedbackground sm_img">
        </div>
        <div className="animatedbackground des_3">
        </div>
        <div className="animatedbackground sm_img">
        </div>
        <div className="sub">
          <div className="animatedbackground sm_img">
          </div>
          <div className="animatedbackground sm_img">
          </div>
          <div className="animatedbackground sm_img">
          </div>
        </div>
      </div>
    </div>
    <div className="sectimeline_item">
      <div className="animatedbackground sec_con">
      </div>
      <div className="animatedbackground sec_con1">
      </div>
    </div>
    <style jsx>{`
  .timeline_wrapper{
    max-width: 1140px;
    padding: 36px 0px  63px 0px;
    color: #2d2d2d;
    margin: 0 auto;
    width: 100%;
  }
  .timeline_item {
    background: #fff;
    border-radius: 3px;
    padding: 12px;
    margin: 0 auto;
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
    margin-top:20px;
  }
  .firstanimatedContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .firstanimatedContainer:first-child{
    margin-top: 0px;
  }
  .secondanimatedContainer{
    display: flex;
    flex-direction: column;
    margin-left:80px;
    width: 100%;
  }
  .des{
    width: 100%;
    height: 25px;
    width: auto;
  }
  .title{
    width: 100px;
    height: 25px;
  }
  .account{
    width: 200px;
    height: 25px;
  }
  .image{
    width: 300px;
    height: 300px;
  }
  .sm_img{
    width: 90px;
    height: 50px;
  }
  .des_2{
    width: 90%;
    height: 25px;
  }
  .des_3{
    width: 20%;
    height: 25px;
  }
  .sub{
    display: flex;
  }
  .sub>* {
    margin-right: 20px;
  }

  .sectimeline_item{
    display: flex;
  }

  .sec_con{
    height: 100px;
  }
  .sec_con{
    width: 40%;
    margin-right: 20px;
  }
  .sec_con1{
    width: 40%;
  }
  @media(max-width:876px){
    .timeline_item {
      flex-direction: column;
    }
    .secondanimatedContainer{
      margin-left: 0;
    }
    .image{
      width: 95%;
      height: 300px;
    }
    .sectimeline_item{
      display: none;
    }
  }
  `}</style>
  </div>

)
export default productDetailLoading