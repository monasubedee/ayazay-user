import React from 'react';
import Link from 'next/link';

const UnderMainTanence = ({ query }) => {

    return (
        <div className="container">
            <div className="subcontainer">
                <div className="con">
                    <img src="/images/ayazaylogo.png"></img>
                    <h1>COMMING SOON</h1>
                    {
                        query !== undefined ?
                            <Link href={`/shopdetail/${query.id}`}>
                                <button className="back">Back</button>
                            </Link>
                            :
                            <Link href={`/`}>
                                <button className="back">Back</button>
                            </Link>
                    }

                </div>
            </div>
            <style jsx>{`
        .container{
            max-width:1140px;
            margin:0 auto ;
            display:flex;
            justify-content: center;
            align-items: center;
            height:600px;
          
        }
        .con{
            text-align:center;
        }
        .subcontainer>*{
            margin:30px;
            text-algin:center;
        }
        .back{
            width:90px;
            background-color:#e4e9f0;
            border: none;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            margin: 4px 2px;
            color: #394358;
            cursor: pointer;
        }
        .subcontainer img{
            width:80%;
        }
    `}</style>
        </div>
    )

}
export default UnderMainTanence;