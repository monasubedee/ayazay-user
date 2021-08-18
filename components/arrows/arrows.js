export const PrevArrow = (props) => {
    const { style, onClick } = props
    return (
        <div>
            <div
                className='prev_slick'
                style={{ ...style, display: "block", marginLeft: '-20px' }}
                onClick={onClick}
            />

            <style jsx>{`
                .prev_slick{
                    left: -25px;
                    font-size: 0;
                    line-height: 0;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    -webkit-transform: translate(0,-50%);
                    -ms-transform: translate(0,-50%);
                    transform: translate(0,-50%);
                    cursor: pointer;
                    border: none;
                    outline: 0;
                    position: absolute;
                    display: block;
                    padding: 0;
                    z-index:1;
                }

                .prev_slick:before{
                    content:'\f0a8'
                }
                .prev_slick:before {
                    font-size: 30px;
                    line-height: 1;
                    opacity: .3;
                    color: #fff;
                }
            `}</style>
        </div>
    )
}
export const NextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div>
            <div
                className='next_slick'
                style={{ ...style, display: "block", marginRight: '-20px' }}
                onClick={onClick}
            />
            <style jsx>{`
                .next_slick{
                    right: -25px;
                    font-size: 0;
                    line-height: 0;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    -webkit-transform: translate(0,-50%);
                    -ms-transform: translate(0,-50%);
                    transform: translate(0,-50%);
                    cursor: pointer;
                    border: none;
                    outline: 0;
                    position: absolute;
                    display: block;
                    padding: 0;
                    z-index:1;
                }

                .next_slick:before{
                    content:'\f0a9'
                }
                .next_slick:before {
                    font-size: 30px;
                    line-height: 1;
                    opacity: .3;
                    color: #fff;
                }
            `}</style>
        </div>
    )
}