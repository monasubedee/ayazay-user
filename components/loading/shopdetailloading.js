const shopDetailLoading = () => (
  <div className="timeline_wrapper">
    <div className="timeline_item">
      <div className="firstanimatedContainer">


        <div className="animatedbackground image">
        </div>
        <div className="container">
          <div className="store_button">

            <div className="animatedbackground hoco">
              <div />
            </div>

            <div className="store_container">
              <div className="animatedbackground official">
                <div />
              </div>
              <div className="animatedbackground official_two">
                <div />
              </div>
              <div className="animatedbackground official">
                <div />
              </div>
              <div className="animatedbackground official_two">
                <div />
              </div>
            </div>
          </div>

          <div className="button_container">
            <div className="animatedbackground">
              <div className="follow" />
            </div>
            <div className="animatedbackground">
              <div className="follow" />
            </div>
          </div>

        </div>

      </div>


    </div>
    <div className="header_group">
      <div className="animatedbackground ">
        <div className="header"></div>
      </div>
      <div className="animatedbackground">
        <div className="header"></div>
      </div>
      <div className="animatedbackground">
        <div className="header"></div>
      </div>
      <div className="animatedbackground">
        <div className="header"></div>
      </div>
      <div className="animatedbackground">
        <div className="header"></div>
      </div>
    </div>
    <div className="sectimeline_item">
      <div className="animatedbackground sec_con">
      </div>
    </div>
    <style jsx>{`
  .timeline_wrapper{
    max-width: 1140px;
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
    justify-content: center;
    width:100%;
  }
  .firstanimatedContainer:first-child{
    margin-top: 0px;
  }
  .secondanimatedContainer{
    display: flex;

    margin-top:55px;
    margin-left:-46px;
  }
  .hoco{
    width:100px;
    height:100px;
  }
  .store_container{
    display:flex;
    flex-direction:column;
    padding-top:14px;
  }
  .official{
    width:200px;
    height:17px;
    margin-left:20px;
    margin-top:7px;
  }
  .official_two{
    width:100px;
    height:17px;
    margin-left:20px;
    margin-top:7px;
  }
  .button_container{
    display:flex;

  }
  .button_container>*{
    margin-right:20px;
  }
  .follow{
    width:180px;
    height:46px;

  }
  .container{
    width:100%;
    padding-left:35px;
  }
  .store_button{
    display:flex;

  }

  .image{
    width:100%;
    height: 250px;
  }
  .header_group{
    display:flex;

  }
  .header_group>*{
    margin-right:40px;
  }
  .header{
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
    width: 100%;
    height:450px;

  }
  .sec_con1{
    width: 40%;
  }
  @media(max-width:1200px){

    .button_container{
      flex-direction:row;

    }
     .follow{
      width:154px;
    }
    .header_group{
      padding-left:11px;
    }

  }
  @media(max-width:876px){
    .timeline_item {
      flex-direction: column;
    }
    .firstanimatedContainer{
      flex-direction:column;
    }
    .container{
      padding-left:0px;
    }
    .secondanimatedContainer{
      margin-left: 0;
    }
    .image{
      width: 100%;
      height: 300px;
    }
    .sectimeline_item{
      display: none;
    }
    .timeline_wrapper{
      padding:0px;
    }
    .header_group{
      overflow-x:hidden;
    }
    .button_container{
      width:100%;

    }

    .store_container{
      width:100%;
    }
  }
  @media(max-width:360px){
    .follow{
      width:100px;
    }
    .official{
      width:auto;
    }
  }
  `}</style>
  </div>

)
export default shopDetailLoading;