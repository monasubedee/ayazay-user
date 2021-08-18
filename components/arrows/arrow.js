export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div

      className="slick-next"
      style={{ ...style, display: "block", paddingBottom: "8rem" }}
      onClick={onClick}
    >
      <style jsx>
        {
          `
                  .slick-next{
                     right:-25px;
                     color:#394358;

                  }
                  .slick-next:before{
                      background-color:#eee;
                      box-shadow:0px 1px 2px 3px rgba(57, 67, 88, 0.4)

                  }


                  `
        }
      </style>
    </div>
  );
}

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-prev"
      style={{ ...style, display: "block", left: "-70px", paddingBottom: "8rem" }}
      onClick={onClick}
    >
      <style jsx>
        {
          `
                  .slick-prev{
                      display:block;
                      color:#394358;
                  }
                  .slick-prev:before{
                      background-color:#eee;
                      box-shadow:0px 1px 2px 3px rgba(57, 67, 88, 0.4)
                  }
                  `
        }
      </style>
    </div>
  );
}