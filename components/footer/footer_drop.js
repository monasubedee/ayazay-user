import React, { useContext, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import { LangContext } from '../../constants/langcontext'





const FooterDrop = (props) => {

  const {lang} = useContext(LangContext);


     
  const footeritem = {
    items: [
  
      {
        id: 'footer',
        title: `${lang.aboutUs}`,
        children: [
          {
            id: 'urlLink',
            content_title: '',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            url: '/'
          },
  
        ],
      },
  
      {
        id: 'footer',
        title: `${lang.ourServices}`,
        children: [
  
          {
            id: 'urlLink',
            value: 'Lorem Ipsum Dolor Sit amet Consert Adispiscing Elit Sed DoUt enim ad minim Veniam, Quis nostrud Exercitation Ullamco',
            url: '/'
          },
  
  
        ],
      },
  
      {
        id: 'footer',
        title: `${lang.helpFAQs}`,
        children: [
          {
            id: 'urlLink',
            value: 'Payment System Dolor Sit amet Consert Adispiscing  Elit Sed Do Ut enim ad minim Veniam, Quis nostrud n Ullamco',
            url: '/'
          },
  
        ],
      },
  
      {
        id: 'footer',
        title: `${lang.information}`,
        children: [
          {
            id: 'urlLink',
            value: 'Became a Merchant Lorem Ipsum Dolor Sit amet Consert Adispiscing Elit Sed Do',
            url: '/'
          },
  
  
        ],
      },
  
    ]
  }


  const width = useWindowWidth()
  const { title, children } = props.items
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
 

  return (
    <div className='footer_wrapper'>
      <div className='dd_wrapper'>

        <div
          tabIndex={0}
          className='dd_header'
          role="button"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className='dd_header__title'>
            <div className='dd_header__title_bold'>{title}</div>
          </div>
          <div className='dd_header__action'>
            <p >{open ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}</p>
          </div>
        </div>
        <div>


          {open && (
            <div className='dd_list'>
              {children.map((item, index) => (
                <div className='dd_list_item' key={index}>
                  <div className='dd_list_container'>
                    <div className='dd_list_link'  >
                      <div className='footer_open'>
                        <p className='dd_list_value'>{item.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

          )}
        </div>

      </div>


      <style jsx>
        {
          `
          footer{
            padding-top: 75px;

            max-width: 1140px;
            margin: auto;
          }
          .footer_container{
            display: flex;
            flex-direction:column;
            justify-content: space-between;
          }

          .footer_wrapper{
            display:flex;
            flex-direction:column;
          }

          .dd_wrapper {
            display:flex;
            flex-direction:column;
            margin-bottom:32px ;
          },
          .dd_header>div{
            display:flex;
            justify-content:space-between;
          }
          .dd_header {
            outline: 0;
            width:100%;
            cursor: pointer;
            padding: 0 15px;
          },
          .dd_list {
            padding:3px 3px;
            margin: 0;
          },
          .dd_list_value{
            font-size:13px;

            line-weight:1.85px;
          }

          .dd_header__title_bold {
            font-size:16px;
            font-weight: 600;
            padding: 8px 0;
          }
          .dd_list_item{

            padding: 3px 0px;
          }

          @media(max-width:992px){
            .dd_list_value{
              font-size:14px;
            }
            .dd_list{
              padding:2px 3px;
            }
            .dd_wrapper{
              margin-bottom:21px;
            }
          }

          @media(max-width:480px){
            .dd_header__title_bold{
              font-size:14px;
            }
            .dd_list_value{
              line-height:1.54;
              font-size:13px;
            }
            .dd_list{
              padding:0px;
            }
            .dd_wrapper{
              margin-bottom:0px;
            }



          }




          `
        }
      </style>

    </div>
  )
}


export default FooterDrop;